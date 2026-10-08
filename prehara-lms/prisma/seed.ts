import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Prehara LMS Seed ---');

  // Clean existing seed data
  await prisma.rolePermission.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.membership.deleteMany({});
  await prisma.invitation.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.aiChat.deleteMany({});
  await prisma.batch.deleteMany({});
  await prisma.platformRevenue.deleteMany({});
  await prisma.consentRecord.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verificationToken.deleteMany({});
  await prisma.organizationDomain.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.organization.deleteMany({});

  const passwordHash = await bcrypt.hash('Prehara@123', 10);

  // 1. ORGANIZATIONS
  const preharaOrg = await prisma.organization.create({
    data: {
      name: 'Prehara Head Office',
      slug: 'prehara',
      isDefault: true,
      primaryColor: '#0F172A',
      accentColor: '#2563EB',
    },
  });

  const iitbOrg = await prisma.organization.create({
    data: {
      name: 'IIT Bombay',
      slug: 'iitb',
      customDomain: 'lms.iitb.ac.in',
      isDefault: false,
      primaryColor: '#1E3A8A',
      accentColor: '#3B82F6',
    },
  });

  const nitkOrg = await prisma.organization.create({
    data: {
      name: 'NIT Karnataka',
      slug: 'nitk',
      isDefault: false,
      primaryColor: '#065F46',
      accentColor: '#10B981',
    },
  });

  // Domain for auto-join
  await prisma.organizationDomain.create({
    data: {
      organizationId: iitbOrg.id,
      domain: 'iitb.ac.in',
      isVerified: true,
      verifiedAt: new Date(),
    },
  });

  // 2. USERS
  const platformAdminUser = await prisma.user.create({
    data: {
      email: 'platformadmin@prehara.com',
      name: 'Platform Admin',
      passwordHash,
      emailVerified: new Date(),
      twoFactorEnabled: true,
      twoFactorSecret: 'JBSWY3DPEHPK3PXP', // Base32 test secret
    },
  });

  const orgAdminUser = await prisma.user.create({
    data: {
      email: 'admin@iitb.ac.in',
      name: 'IITB Admin',
      passwordHash,
      emailVerified: new Date(),
    },
  });

  const trainerUser = await prisma.user.create({
    data: {
      email: 'trainer@iitb.ac.in',
      name: 'Dr. Ramesh (Trainer)',
      passwordHash,
      emailVerified: new Date(),
    },
  });

  const student1User = await prisma.user.create({
    data: {
      email: 'student1@iitb.ac.in',
      name: 'Aarav Patel (Student 1)',
      passwordHash,
      emailVerified: new Date(),
    },
  });

  const student2User = await prisma.user.create({
    data: {
      email: 'student2@iitb.ac.in',
      name: 'Diya Sharma (Student 2)',
      passwordHash,
      emailVerified: new Date(),
    },
  });

  const nitkStudentUser = await prisma.user.create({
    data: {
      email: 'student@nitk.ac.in',
      name: 'Rohan (NITK Student)',
      passwordHash,
      emailVerified: new Date(),
    },
  });

  // 3. SEED ROLES & PERMISSIONS FOR EACH ORG
  const orgs = [preharaOrg, iitbOrg, nitkOrg];

  for (const org of orgs) {
    // Define roles
    const platformAdminRole = await prisma.role.create({
      data: {
        organizationId: org.id,
        name: 'Platform Administrator',
        code: 'PLATFORM_ADMIN',
      },
    });

    const orgAdminRole = await prisma.role.create({
      data: {
        organizationId: org.id,
        name: 'Organisation Administrator',
        code: 'ORG_ADMIN',
      },
    });

    const trainerRole = await prisma.role.create({
      data: {
        organizationId: org.id,
        name: 'Trainer',
        code: 'TRAINER',
      },
    });

    const studentRole = await prisma.role.create({
      data: {
        organizationId: org.id,
        name: 'Student',
        code: 'STUDENT',
      },
    });

    const guestRole = await prisma.role.create({
      data: {
        organizationId: org.id,
        name: 'Guest',
        code: 'GUEST',
      },
    });

    // Seed dynamic permissions
    const permissionsData = [
      { action: 'read', resource: 'catalogue', description: 'View course catalogue' },
      { action: 'read', resource: 'announcement_public', description: 'View public announcements' },
      { action: 'read', resource: 'session_teaser', description: 'View session teasers' },
      { action: 'create', resource: 'contact_form', description: 'Submit contact form' },
      { action: 'read', resource: 'profile', description: 'View student profile' },
      { action: 'update', resource: 'profile', description: 'Update profile' },
      { action: 'read', resource: 'progress', description: 'View personal learning progress' },
      { action: 'read', resource: 'announcement', description: 'View own batch announcements' },
      { action: 'read', resource: 'live_session', description: 'Attend live sessions' },
      { action: 'create', resource: 'support_ticket', description: 'Raise support ticket' },
      { action: 'read', resource: 'ai_chat', description: 'View private AI chats' },
      { action: 'create', resource: 'ai_chat', description: 'Participate in AI chat' },
      { action: 'read', resource: 'batch', description: 'View assigned batch' },
      { action: 'update', resource: 'batch', description: 'Manage assigned batch' },
      { action: 'read', resource: 'batch_progress', description: 'View aggregate batch progress' },
      { action: 'read', resource: 'grading', description: 'View grading queue' },
      { action: 'update', resource: 'grading', description: 'Grade submissions' },
      { action: 'create', resource: 'announcement_batch', description: 'Post batch announcements' },
      { action: 'manage', resource: 'session_controls', description: 'Host live sessions' },
      { action: 'read', resource: 'batch_support', description: 'Access batch support queue' },
      { action: 'read', resource: 'org_progress', description: 'View organisation aggregate progress' },
      { action: 'read', resource: 'readiness_report', description: 'View industry-readiness report' },
      { action: 'read', resource: 'invoice', description: 'View org invoices' },
      { action: 'create', resource: 'announcement_org', description: 'Make org-wide announcements' },
      { action: 'manage', resource: 'org_support', description: 'Access org support queue' },
      { action: 'manage', resource: 'branding', description: 'Customize org branding' },
      { action: 'manage', resource: 'user', description: 'Manage organisation users' },
      { action: 'read', resource: 'audit_log', description: 'View audit logs' },
      { action: 'read', resource: 'revenue', description: 'View platform revenue' },
      { action: 'manage', resource: 'impersonation', description: 'Impersonate users' },
      { action: '*', resource: '*', description: 'Full platform wildcard access' },
    ];

    const createdPermissions: Record<string, string> = {};
    for (const p of permissionsData) {
      const perm = await prisma.permission.create({
        data: {
          organizationId: org.id,
          action: p.action,
          resource: p.resource,
          description: p.description,
        },
      });
      createdPermissions[`${p.action}:${p.resource}`] = perm.id;
    }

    // Assign to roles
    // Guest
    for (const key of ['read:catalogue', 'read:announcement_public', 'read:session_teaser', 'create:contact_form']) {
      await prisma.rolePermission.create({
        data: { organizationId: org.id, roleId: guestRole.id, permissionId: createdPermissions[key] },
      });
    }

    // Student
    for (const key of [
      'read:catalogue',
      'read:profile',
      'update:profile',
      'read:progress',
      'read:announcement',
      'read:live_session',
      'create:support_ticket',
      'read:ai_chat',
      'create:ai_chat',
    ]) {
      await prisma.rolePermission.create({
        data: { organizationId: org.id, roleId: studentRole.id, permissionId: createdPermissions[key] },
      });
    }

    // Trainer (student view for own account + trainer controls)
    for (const key of [
      'read:catalogue',
      'read:profile',
      'update:profile',
      'read:progress',
      'read:announcement',
      'read:live_session',
      'create:support_ticket',
      'read:batch_progress',
      'read:grading',
      'update:grading',
      'create:announcement_batch',
      'manage:session_controls',
      'read:batch_support',
      'read:batch',
      'update:batch',
    ]) {
      await prisma.rolePermission.create({
        data: { organizationId: org.id, roleId: trainerRole.id, permissionId: createdPermissions[key] },
      });
    }

    // Org Admin (org aggregate progress, readiness report, invoices, announce, org support, branding, user management, audit log)
    // EXPLICITLY NO grading queue, NO platform revenue, NO individual AI chats
    for (const key of [
      'read:org_progress',
      'read:readiness_report',
      'read:invoice',
      'create:announcement_org',
      'manage:org_support',
      'manage:branding',
      'manage:user',
      'read:audit_log',
    ]) {
      await prisma.rolePermission.create({
        data: { organizationId: org.id, roleId: orgAdminRole.id, permissionId: createdPermissions[key] },
      });
    }

    // Platform Admin (Wildcard + Revenue + Impersonation)
    await prisma.rolePermission.create({
      data: { organizationId: org.id, roleId: platformAdminRole.id, permissionId: createdPermissions['*:*'] },
    });
    await prisma.rolePermission.create({
      data: { organizationId: org.id, roleId: platformAdminRole.id, permissionId: createdPermissions['read:revenue'] },
    });
    await prisma.rolePermission.create({
      data: { organizationId: org.id, roleId: platformAdminRole.id, permissionId: createdPermissions['manage:impersonation'] },
    });

    // 4. ASSIGN MEMBERSHIPS FOR IITB
    if (org.slug === 'iitb') {
      await prisma.membership.create({
        data: { organizationId: org.id, userId: orgAdminUser.id, roleId: orgAdminRole.id, status: 'ACTIVE' },
      });
      await prisma.membership.create({
        data: { organizationId: org.id, userId: trainerUser.id, roleId: trainerRole.id, status: 'ACTIVE' },
      });
      await prisma.membership.create({
        data: { organizationId: org.id, userId: student1User.id, roleId: studentRole.id, status: 'ACTIVE' },
      });
      await prisma.membership.create({
        data: { organizationId: org.id, userId: student2User.id, roleId: studentRole.id, status: 'ACTIVE' },
      });

      // Profiles
      await prisma.profile.create({
        data: {
          organizationId: org.id,
          userId: student1User.id,
          college: 'IIT Bombay',
          branch: 'Computer Science',
          graduationYear: 2026,
          skills: ['TypeScript', 'React', 'PostgreSQL', 'Docker'],
          githubHandle: 'aarav-patel',
          resumeUrl: 'https://storage.prehara.com/resumes/aarav_resume.pdf',
        },
      });

      await prisma.profile.create({
        data: {
          organizationId: org.id,
          userId: student2User.id,
          college: 'IIT Bombay',
          branch: 'Electrical Engineering',
          graduationYear: 2026,
          skills: ['Python', 'Embedded Systems', 'C++'],
          githubHandle: 'diya-sharma',
        },
      });

      // Batches
      // Batch 1: Assigned to Dr. Ramesh (trainer)
      await prisma.batch.create({
        data: {
          id: '11111111-1111-1111-1111-111111111111',
          organizationId: org.id,
          name: 'Full Stack Java & Cloud - Batch A',
          code: 'FS-2026-A',
          trainerId: trainerUser.id,
        },
      });

      // Batch 2: Unassigned / different trainer
      await prisma.batch.create({
        data: {
          id: '22222222-2222-2222-2222-222222222222',
          organizationId: org.id,
          name: 'DevOps & SRE - Batch B',
          code: 'DEVOPS-2026-B',
          trainerId: null, // unassigned
        },
      });

      // AI Chat owned by Student 1
      await prisma.aiChat.create({
        data: {
          id: '33333333-3333-3333-3333-333333333333',
          organizationId: org.id,
          userId: student1User.id,
          topic: 'Explaining PostgreSQL B-Tree Indexes',
        },
      });

      // Consent records for student 1
      await prisma.consentRecord.create({
        data: {
          organizationId: org.id,
          userId: student1User.id,
          purpose: 'TERMS_OF_SERVICE',
          policyVersion: 'v1.0.0',
          ipAddress: '103.21.244.1',
          userAgent: 'Mozilla/5.0 Chrome/122.0',
        },
      });
    }

    // NITK Membership (Org B)
    if (org.slug === 'nitk') {
      await prisma.membership.create({
        data: { organizationId: org.id, userId: nitkStudentUser.id, roleId: studentRole.id, status: 'ACTIVE' },
      });
      await prisma.profile.create({
        data: {
          organizationId: org.id,
          userId: nitkStudentUser.id,
          college: 'NIT Karnataka',
          branch: 'Information Technology',
          graduationYear: 2027,
          skills: ['Java', 'Spring Boot'],
        },
      });
      await prisma.batch.create({
        data: {
          id: '44444444-4444-4444-4444-444444444444',
          organizationId: org.id,
          name: 'NITK Java Enterprise Batch',
          code: 'NITK-JE-2026',
        },
      });
    }

    // Default Prehara Org Memberships
    if (org.slug === 'prehara') {
      await prisma.membership.create({
        data: { organizationId: org.id, userId: platformAdminUser.id, roleId: platformAdminRole.id, status: 'ACTIVE' },
      });

      // Platform Revenue record (amount stored as integer paise: Rs 5,00,000 = 50,000,000 paise)
      await prisma.platformRevenue.create({
        data: {
          organizationId: org.id,
          amountPaise: BigInt(50000000),
          period: '2026-Q1',
        },
      });
    }
  }

  console.log('--- Prehara LMS Seed Complete Successfully ---');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
