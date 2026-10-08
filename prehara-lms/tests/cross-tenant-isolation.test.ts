import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '../src/lib/db/prisma';
import { can, assertCan, ForbiddenError, UnauthorizedError } from '../src/lib/permissions/can';
import { createTenantClient } from '../src/lib/db/tenant-client';
import { startImpersonation } from '../src/lib/audit/audit-logger';
import { AuthContextUser } from '../src/lib/types/auth';

describe('Stage 1: Multi-Tenancy, Authorization, and Data Layer Isolation Tests', () => {
  // Test fixture IDs populated from seed
  let orgAId: string; // IIT Bombay
  let orgBId: string; // NIT Karnataka
  let preharaDefaultOrgId: string; // Prehara Head Office

  let studentA1: AuthContextUser;
  let studentA2: AuthContextUser;
  let trainerA: AuthContextUser;
  let orgAdminA: AuthContextUser;
  let platformAdmin: AuthContextUser;
  let guestUser: AuthContextUser;

  let batchAAssignedId: string;
  let batchAUnassignedId: string;
  let batchBId: string;
  let studentA1ChatId: string;

  beforeAll(async () => {
    // Look up seeded organizations
    const orgA = await prisma.organization.findUniqueOrThrow({ where: { slug: 'iitb' } });
    const orgB = await prisma.organization.findUniqueOrThrow({ where: { slug: 'nitk' } });
    const preharaOrg = await prisma.organization.findUniqueOrThrow({ where: { slug: 'prehara' } });

    orgAId = orgA.id;
    orgBId = orgB.id;
    preharaDefaultOrgId = preharaOrg.id;

    // Look up seeded users
    const uStudent1 = await prisma.user.findUniqueOrThrow({ where: { email: 'student1@iitb.ac.in' } });
    const uStudent2 = await prisma.user.findUniqueOrThrow({ where: { email: 'student2@iitb.ac.in' } });
    const uTrainer = await prisma.user.findUniqueOrThrow({ where: { email: 'trainer@iitb.ac.in' } });
    const uOrgAdmin = await prisma.user.findUniqueOrThrow({ where: { email: 'admin@iitb.ac.in' } });
    const uPlatformAdmin = await prisma.user.findUniqueOrThrow({ where: { email: 'platformadmin@prehara.com' } });

    studentA1 = {
      id: uStudent1.id,
      email: uStudent1.email,
      activeOrganizationId: orgAId,
      roleCode: 'STUDENT',
    };

    studentA2 = {
      id: uStudent2.id,
      email: uStudent2.email,
      activeOrganizationId: orgAId,
      roleCode: 'STUDENT',
    };

    trainerA = {
      id: uTrainer.id,
      email: uTrainer.email,
      activeOrganizationId: orgAId,
      roleCode: 'TRAINER',
    };

    orgAdminA = {
      id: uOrgAdmin.id,
      email: uOrgAdmin.email,
      activeOrganizationId: orgAId,
      roleCode: 'ORG_ADMIN',
    };

    platformAdmin = {
      id: uPlatformAdmin.id,
      email: uPlatformAdmin.email,
      activeOrganizationId: preharaDefaultOrgId,
      roleCode: 'PLATFORM_ADMIN',
    };

    guestUser = {
      id: '00000000-0000-0000-0000-000000000000',
      email: 'guest@example.com',
      activeOrganizationId: orgAId,
      roleCode: 'GUEST',
    };

    // Look up seeded batch and chat fixtures
    const batch1 = await prisma.batch.findUniqueOrThrow({ where: { id: '11111111-1111-1111-1111-111111111111' } });
    const batch2 = await prisma.batch.findUniqueOrThrow({ where: { id: '22222222-2222-2222-2222-222222222222' } });
    const batchB = await prisma.batch.findUniqueOrThrow({ where: { id: '44444444-4444-4444-4444-444444444444' } });
    const chat1 = await prisma.aiChat.findUniqueOrThrow({ where: { id: '33333333-3333-3333-3333-333333333333' } });

    batchAAssignedId = batch1.id;
    batchAUnassignedId = batch2.id;
    batchBId = batchB.id;
    studentA1ChatId = chat1.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // -------------------------------------------------------------------------
  // TEST 1: Cross-Tenant Isolation at Data Layer (ASSERT 403)
  // "A user in organisation A requesting ANY resource in organisation B gets 403
  // at the data layer, not merely at the route."
  // -------------------------------------------------------------------------
  describe('1. Cross-Tenant Denial (Data Layer Enforcement)', () => {
    it('DENIES Org A user requesting ANY resource belonging to Org B at data layer with 403 Forbidden', async () => {
      const orgAClient = createTenantClient(orgAId, studentA1);

      // Attempt to access Org B batch through Org A tenant-scoped client
      await expect(orgAClient.batches.findUnique(batchBId)).rejects.toThrowError(ForbiddenError);

      try {
        await orgAClient.batches.findUnique(batchBId);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ForbiddenError);
        expect(error.code).toBe('CROSS_TENANT_FORBIDDEN');
      }
    });

    it('DENIES permission check when target organization does not match user active organization', async () => {
      const isAllowed = await can(studentA1, 'read', {
        resource: 'profile',
        organizationId: orgBId, // Cross-tenant target
        ownerId: studentA1.id,
      });

      expect(isAllowed).toBe(false);
    });

    it('ALLOWS valid same-tenant resource access within Org A', async () => {
      const orgAClient = createTenantClient(orgAId, studentA1);
      const batch = await orgAClient.batches.findUnique(batchAAssignedId);
      expect(batch).toBeDefined();
      expect(batch?.organizationId).toBe(orgAId);
    });
  });

  // -------------------------------------------------------------------------
  // TEST 2: Trainer Batch Ownership Isolation (ASSERT 403)
  // "A trainer requesting a batch they are not assigned to gets 403 from the server."
  // -------------------------------------------------------------------------
  describe('2. Trainer Batch Assignment Isolation', () => {
    it('DENIES trainer access to an unassigned batch with 403', async () => {
      await expect(
        assertCan(trainerA, 'update', {
          resource: 'batch',
          organizationId: orgAId,
          trainerId: '99999999-9999-9999-9999-999999999999', // Different trainer
        })
      ).rejects.toThrowError(ForbiddenError);

      const isAllowed = await can(trainerA, 'update', {
        resource: 'batch',
        organizationId: orgAId,
        trainerId: null, // Unassigned
      });
      expect(isAllowed).toBe(false);
    });

    it('ALLOWS trainer access to their own assigned batch', async () => {
      const isAllowed = await can(trainerA, 'update', {
        resource: 'batch',
        organizationId: orgAId,
        trainerId: trainerA.id, // Assigned to Dr. Ramesh
      });
      expect(isAllowed).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // TEST 3: Student Profile Ownership Isolation (ASSERT 403)
  // "A student requesting another student's profile gets 403."
  // -------------------------------------------------------------------------
  describe('3. Student Profile Ownership Isolation', () => {
    it('DENIES a student requesting another student profile with 403', async () => {
      await expect(
        assertCan(studentA1, 'read', {
          resource: 'profile',
          organizationId: orgAId,
          ownerId: studentA2.id, // Diya Sharma's profile
        })
      ).rejects.toThrowError(ForbiddenError);

      const isAllowed = await can(studentA1, 'read', {
        resource: 'profile',
        organizationId: orgAId,
        ownerId: studentA2.id,
      });
      expect(isAllowed).toBe(false);
    });

    it('ALLOWS student to read and update their own profile', async () => {
      const canReadOwn = await can(studentA1, 'read', {
        resource: 'profile',
        organizationId: orgAId,
        ownerId: studentA1.id,
      });
      expect(canReadOwn).toBe(true);

      const canUpdateOwn = await can(studentA1, 'update', {
        resource: 'profile',
        organizationId: orgAId,
        ownerId: studentA1.id,
      });
      expect(canUpdateOwn).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // TEST 4: Org Admin Boundary Restrictions (ASSERT 403)
  // "An org admin requesting a student's AI chat or platform revenue gets 403."
  // -------------------------------------------------------------------------
  describe('4. Org Admin Scoping & Isolation', () => {
    it('DENIES Org Admin requesting a student AI chat with 403', async () => {
      await expect(
        assertCan(orgAdminA, 'read', {
          resource: 'ai_chat',
          organizationId: orgAId,
          ownerId: studentA1.id,
        })
      ).rejects.toThrowError(ForbiddenError);

      const isAllowed = await can(orgAdminA, 'read', {
        resource: 'ai_chat',
        organizationId: orgAId,
        ownerId: studentA1.id,
      });
      expect(isAllowed).toBe(false);
    });

    it('DENIES Org Admin requesting platform revenue with 403 at data layer', async () => {
      const orgAdminClient = createTenantClient(orgAId, orgAdminA);

      await expect(orgAdminClient.revenues.findMany()).rejects.toThrowError(ForbiddenError);

      const isAllowed = await can(orgAdminA, 'read', {
        resource: 'revenue',
        organizationId: orgAId,
      });
      expect(isAllowed).toBe(false);
    });

    it('DENIES Org Admin access to trainer grading queue (per prompt specification)', async () => {
      const canGrade = await can(orgAdminA, 'update', {
        resource: 'grading',
        organizationId: orgAId,
      });
      expect(canGrade).toBe(false);
    });

    it('ALLOWS Org Admin valid org actions (readiness report, invoices, user management)', async () => {
      const canReport = await can(orgAdminA, 'read', {
        resource: 'readiness_report',
        organizationId: orgAId,
      });
      expect(canReport).toBe(true);

      const canManageUsers = await can(orgAdminA, 'manage', {
        resource: 'user',
        organizationId: orgAId,
      });
      expect(canManageUsers).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // TEST 5: Guest Access Restrictions (ASSERT 401)
  // "A guest requesting any authenticated endpoint gets 401."
  // -------------------------------------------------------------------------
  describe('5. Guest Unauthenticated Denial', () => {
    it('DENIES guest requesting authenticated student profile with 401 Unauthorized', async () => {
      await expect(
        assertCan(guestUser, 'read', {
          resource: 'profile',
          organizationId: orgAId,
        })
      ).rejects.toThrowError(UnauthorizedError);

      await expect(
        assertCan(null, 'read', {
          resource: 'profile',
          organizationId: orgAId,
        })
      ).rejects.toThrowError(UnauthorizedError);
    });

    it('DENIES guest requesting batch details or internal announcements with 401', async () => {
      await expect(
        assertCan(guestUser, 'read', {
          resource: 'batch',
          organizationId: orgAId,
        })
      ).rejects.toThrowError(UnauthorizedError);
    });

    it('ALLOWS guest to view public catalogue, announcements teaser, and contact form', async () => {
      const canReadCatalogue = await can(guestUser, 'read', { resource: 'catalogue' });
      expect(canReadCatalogue).toBe(true);

      const canReadTeaser = await can(guestUser, 'read', { resource: 'session_teaser' });
      expect(canReadTeaser).toBe(true);

      const canSubmitContact = await can(guestUser, 'create', { resource: 'contact_form' });
      expect(canSubmitContact).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // TEST 6: Audited Impersonation by Platform Admin
  // "A platform admin impersonating a user writes an audit row."
  // -------------------------------------------------------------------------
  describe('6. Platform Admin Impersonation & Audit Log', () => {
    it('ALLOWS platform admin to impersonate student and WRITES an audit row with impersonatorId', async () => {
      const initialAuditCount = await prisma.auditLog.count({
        where: {
          impersonatorId: platformAdmin.id,
          action: 'IMPERSONATION_START',
        },
      });

      const result = await startImpersonation(
        platformAdmin,
        studentA1.id,
        orgAId,
        'Investigating student LMS submission sync issue'
      );

      expect(result.success).toBe(true);
      expect(result.auditRow).toBeDefined();
      expect(result.auditRow.actorId).toBe(studentA1.id);
      expect(result.auditRow.impersonatorId).toBe(platformAdmin.id);
      expect(result.auditRow.organizationId).toBe(orgAId);

      // Verify row persisted in DB
      const updatedAuditCount = await prisma.auditLog.count({
        where: {
          impersonatorId: platformAdmin.id,
          action: 'IMPERSONATION_START',
        },
      });

      expect(updatedAuditCount).toBe(initialAuditCount + 1);
    });

    it('DENIES non-platform-admin from initiating impersonation', async () => {
      await expect(
        startImpersonation(orgAdminA, studentA1.id, orgAId, 'Unauthorized attempt')
      ).rejects.toThrowError('Only PLATFORM_ADMIN can initiate impersonation');
    });
  });
});
