import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ImpersonationRequestSchema } from '@/lib/validations';
import { startImpersonation } from '@/lib/audit/audit-logger';
import { AuthContextUser } from '@/lib/types/auth';

export async function POST(request: NextRequest) {
  try {
    const orgId = request.headers.get('x-organization-id');
    const userId = request.headers.get('x-user-id');
    const roleCode = (request.headers.get('x-role-code') || 'GUEST') as any;

    if (!orgId || !userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const callerUser: AuthContextUser = {
      id: userId,
      email: '',
      activeOrganizationId: orgId,
      roleCode,
    };

    if (callerUser.roleCode !== 'PLATFORM_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: only PLATFORM_ADMIN can initiate audited impersonation' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = ImpersonationRequestSchema.parse(body);

    // Look up target user and target membership
    const targetUser = await prisma.user.findUniqueOrThrow({
      where: { id: validated.targetUserId },
      include: { memberships: { include: { role: true, organization: true } } },
    });

    const activeMembership = targetUser.memberships[0];
    const targetOrgId = activeMembership?.organizationId || orgId;

    const result = await startImpersonation(
      callerUser,
      targetUser.id,
      targetOrgId,
      validated.reason
    );

    return NextResponse.json({
      success: true,
      impersonatedUser: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        organizationId: targetOrgId,
        roleCode: activeMembership?.role.code || 'STUDENT',
      },
      auditLogId: result.auditRow.id,
    });
  } catch (error: any) {
    const status = error.name === 'ZodError' ? 400 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
