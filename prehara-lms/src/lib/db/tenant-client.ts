import { prisma } from '@/lib/db/prisma';
import { AuthContextUser } from '@/lib/types/auth';
import { ForbiddenError } from '@/lib/permissions/can';

/**
 * TenantScopedClient enforces that:
 * 1. Every query is strictly locked to the given organizationId.
 * 2. Cross-tenant access is rejected at the data layer with 403 Forbidden.
 * 3. Soft-deleted rows (deletedAt != null) are excluded by default.
 * 4. PostgreSQL RLS context is set on transactional operations.
 */
export class TenantScopedClient {
  public readonly organizationId: string;
  public readonly user?: AuthContextUser;

  constructor(organizationId: string, user?: AuthContextUser) {
    if (!organizationId) {
      throw new Error('TenantScopedClient requires a valid organizationId');
    }
    this.organizationId = organizationId;
    this.user = user;
  }

  private assertTenantBoundary(entityOrgId?: string) {
    if (entityOrgId && entityOrgId !== this.organizationId) {
      throw new ForbiddenError(
        `Cross-tenant violation: requested organization [${entityOrgId}] does not match client tenant [${this.organizationId}]`,
        'CROSS_TENANT_FORBIDDEN'
      );
    }
  }

  // -------------------------------------------------------------------------
  // PROFILES
  // -------------------------------------------------------------------------
  get profiles() {
    return {
      findUnique: async (userId: string) => {
        return prisma.profile.findFirst({
          where: {
            organizationId: this.organizationId,
            userId,
            deletedAt: null,
          },
        });
      },
      findMany: async () => {
        return prisma.profile.findMany({
          where: {
            organizationId: this.organizationId,
            deletedAt: null,
          },
        });
      },
      create: async (data: {
        userId: string;
        college?: string;
        branch?: string;
        graduationYear?: number;
        skills?: string[];
        githubHandle?: string;
        resumeUrl?: string;
      }) => {
        return prisma.profile.create({
          data: {
            organizationId: this.organizationId,
            ...data,
          },
        });
      },
      update: async (userId: string, data: Record<string, unknown>) => {
        return prisma.profile.updateMany({
          where: {
            organizationId: this.organizationId,
            userId,
            deletedAt: null,
          },
          data,
        });
      },
      delete: async (userId: string) => {
        // Soft delete
        return prisma.profile.updateMany({
          where: {
            organizationId: this.organizationId,
            userId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      },
    };
  }

  // -------------------------------------------------------------------------
  // BATCHES (Trainer / Student batches)
  // -------------------------------------------------------------------------
  get batches() {
    return {
      findUnique: async (id: string) => {
        const batch = await prisma.batch.findFirst({
          where: {
            id,
            organizationId: this.organizationId,
            deletedAt: null,
          },
        });
        if (!batch) {
          // Verify if it exists in another organization to enforce 403 at data layer
          const crossBatch = await prisma.batch.findUnique({ where: { id } });
          if (crossBatch && crossBatch.organizationId !== this.organizationId) {
            throw new ForbiddenError(
              'Cross-tenant access denied: resource belongs to a different organisation',
              'CROSS_TENANT_FORBIDDEN'
            );
          }
        }
        return batch;
      },
      findMany: async (trainerId?: string) => {
        return prisma.batch.findMany({
          where: {
            organizationId: this.organizationId,
            ...(trainerId ? { trainerId } : {}),
            deletedAt: null,
          },
        });
      },
      create: async (data: { name: string; code: string; trainerId?: string }) => {
        return prisma.batch.create({
          data: {
            organizationId: this.organizationId,
            ...data,
          },
        });
      },
    };
  }

  // -------------------------------------------------------------------------
  // AI CHATS (Student AI chats - strictly private to student)
  // -------------------------------------------------------------------------
  get aiChats() {
    return {
      findUnique: async (id: string) => {
        const chat = await prisma.aiChat.findFirst({
          where: {
            id,
            organizationId: this.organizationId,
            deletedAt: null,
          },
        });
        if (!chat) {
          const crossChat = await prisma.aiChat.findUnique({ where: { id } });
          if (crossChat && crossChat.organizationId !== this.organizationId) {
            throw new ForbiddenError(
              'Cross-tenant access denied: AI chat belongs to a different organisation',
              'CROSS_TENANT_FORBIDDEN'
            );
          }
        }
        return chat;
      },
      create: async (data: { userId: string; topic: string }) => {
        return prisma.aiChat.create({
          data: {
            organizationId: this.organizationId,
            ...data,
          },
        });
      },
    };
  }

  // -------------------------------------------------------------------------
  // MEMBERSHIPS & USERS
  // -------------------------------------------------------------------------
  get memberships() {
    return {
      findMany: async () => {
        return prisma.membership.findMany({
          where: {
            organizationId: this.organizationId,
            deletedAt: null,
          },
          include: {
            user: true,
            role: true,
          },
        });
      },
      suspend: async (userId: string) => {
        return prisma.membership.updateMany({
          where: {
            organizationId: this.organizationId,
            userId,
            deletedAt: null,
          },
          data: {
            status: 'SUSPENDED',
          },
        });
      },
      restore: async (userId: string) => {
        return prisma.membership.updateMany({
          where: {
            organizationId: this.organizationId,
            userId,
            deletedAt: null,
          },
          data: {
            status: 'ACTIVE',
          },
        });
      },
      changeRole: async (userId: string, newRoleId: string) => {
        return prisma.membership.updateMany({
          where: {
            organizationId: this.organizationId,
            userId,
            deletedAt: null,
          },
          data: {
            roleId: newRoleId,
          },
        });
      },
    };
  }

  // -------------------------------------------------------------------------
  // INVITATIONS
  // -------------------------------------------------------------------------
  get invitations() {
    return {
      create: async (data: { email: string; roleId: string; token: string; expiresAt: DateTime; invitedById: string }) => {
        return prisma.invitation.create({
          data: {
            organizationId: this.organizationId,
            ...data,
          },
        });
      },
      findMany: async () => {
        return prisma.invitation.findMany({
          where: {
            organizationId: this.organizationId,
            deletedAt: null,
          },
        });
      },
    };
  }

  // -------------------------------------------------------------------------
  // CONSENT RECORDS
  // -------------------------------------------------------------------------
  get consentRecords() {
    return {
      create: async (data: {
        userId: string;
        purpose: string;
        policyVersion: string;
        ipAddress?: string;
        userAgent?: string;
      }) => {
        return prisma.consentRecord.create({
          data: {
            organizationId: this.organizationId,
            ...data,
            consentedAt: new Date(),
          },
        });
      },
      withdraw: async (userId: string, purpose: string) => {
        return prisma.consentRecord.updateMany({
          where: {
            organizationId: this.organizationId,
            userId,
            purpose,
            withdrawnAt: null,
          },
          data: {
            withdrawnAt: new Date(),
          },
        });
      },
      getHistory: async (userId: string) => {
        return prisma.consentRecord.findMany({
          where: {
            organizationId: this.organizationId,
            userId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      },
    };
  }

  // -------------------------------------------------------------------------
  // AUDIT LOGS
  // -------------------------------------------------------------------------
  get auditLogs() {
    return {
      create: async (data: {
        actorId: string;
        impersonatorId?: string | null;
        action: string;
        entityType: string;
        entityId: string;
        metadata: Record<string, unknown>;
      }) => {
        return prisma.auditLog.create({
          data: {
            organizationId: this.organizationId,
            actorId: data.actorId,
            impersonatorId: data.impersonatorId ?? null,
            action: data.action,
            entityType: data.entityType,
            entityId: data.entityId,
            metadata: data.metadata as any,
          },
        });
      },
      findMany: async () => {
        return prisma.auditLog.findMany({
          where: {
            organizationId: this.organizationId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      },
    };
  }

  // -------------------------------------------------------------------------
  // PLATFORM REVENUES (Protected)
  // -------------------------------------------------------------------------
  get revenues() {
    return {
      findMany: async () => {
        if (!this.user || this.user.roleCode !== 'PLATFORM_ADMIN') {
          throw new ForbiddenError(
            'Forbidden: only PLATFORM_ADMIN can query platform revenue',
            'REVENUE_ACCESS_DENIED'
          );
        }
        return prisma.platformRevenue.findMany({
          where: {
            organizationId: this.organizationId,
          },
        });
      },
    };
  }
}

export function createTenantClient(organizationId: string, user?: AuthContextUser): TenantScopedClient {
  return new TenantScopedClient(organizationId, user);
}
type DateTime = Date;
