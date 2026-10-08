import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { createTenantClient } from '@/lib/db/tenant-client';
import { assertCan } from '@/lib/permissions/can';
import { CsvBulkImportRowSchema } from '@/lib/validations';
import { logPrivilegedAction } from '@/lib/audit/audit-logger';
import { AuthContextUser } from '@/lib/types/auth';

export async function POST(request: NextRequest) {
  try {
    const orgId = request.headers.get('x-organization-id');
    const userId = request.headers.get('x-user-id');
    const roleCode = (request.headers.get('x-role-code') || 'GUEST') as any;

    if (!orgId || !userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user: AuthContextUser = {
      id: userId,
      email: '',
      activeOrganizationId: orgId,
      roleCode,
    };

    // Assert that caller has permission to manage users in this org
    await assertCan(user, 'manage', { resource: 'user', organizationId: orgId });

    const body = await request.json();
    const rows: unknown[] = body.rows || [];

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'CSV data rows are required' }, { status: 400 });
    }

    const tenantClient = createTenantClient(orgId, user);
    const results = { imported: 0, failed: 0, errors: [] as string[] };

    for (let i = 0; i < rows.length; i++) {
      try {
        const row = CsvBulkImportRowSchema.parse(rows[i]);

        // Find or create global user
        let targetUser = await prisma.user.findUnique({ where: { email: row.email } });
        if (!targetUser) {
          targetUser = await prisma.user.create({
            data: {
              email: row.email,
              name: row.name,
            },
          });
        }

        // Find role in this organisation
        const role = await prisma.role.findFirstOrThrow({
          where: { organizationId: orgId, code: row.roleCode },
        });

        // Upsert membership strictly scoped to this organisation
        await prisma.membership.upsert({
          where: {
            organizationId_userId: {
              organizationId: orgId,
              userId: targetUser.id,
            },
          },
          update: {
            roleId: role.id,
            status: 'ACTIVE',
            deletedAt: null,
          },
          create: {
            organizationId: orgId,
            userId: targetUser.id,
            roleId: role.id,
            status: 'ACTIVE',
          },
        });

        // If college/branch details provided, upsert tenant-scoped profile
        if (row.college || row.branch || row.graduationYear) {
          await prisma.profile.upsert({
            where: {
              organizationId_userId: {
                organizationId: orgId,
                userId: targetUser.id,
              },
            },
            update: {
              college: row.college,
              branch: row.branch,
              graduationYear: row.graduationYear,
            },
            create: {
              organizationId: orgId,
              userId: targetUser.id,
              college: row.college,
              branch: row.branch,
              graduationYear: row.graduationYear,
            },
          });
        }

        results.imported++;
      } catch (err: any) {
        results.failed++;
        results.errors.push(`Row ${i + 1}: ${err.message}`);
      }
    }

    // Write audit log row for the bulk import
    await logPrivilegedAction({
      organizationId: orgId,
      actorId: userId,
      action: 'CSV_IMPORT',
      entityType: 'Membership',
      entityId: orgId,
      metadata: {
        totalRows: rows.length,
        importedCount: results.imported,
        failedCount: results.failed,
      },
    });

    return NextResponse.json({ success: true, ...results });
  } catch (error: any) {
    const status = error.name === 'ForbiddenError' ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
