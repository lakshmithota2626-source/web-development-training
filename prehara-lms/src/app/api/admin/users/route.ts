import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { createTenantClient } from '@/lib/db/tenant-client';
import { assertCan } from '@/lib/permissions/can';
import { UserInviteSchema, UserStatusUpdateSchema, UserRoleChangeSchema } from '@/lib/validations';
import { logPrivilegedAction } from '@/lib/audit/audit-logger';
import { AuthContextUser } from '@/lib/types/auth';

export async function GET(request: NextRequest) {
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

    await assertCan(user, 'manage', { resource: 'user', organizationId: orgId });

    const tenantClient = createTenantClient(orgId, user);
    const memberships = await tenantClient.memberships.findMany();

    return NextResponse.json({ members: memberships });
  } catch (error: any) {
    const status = error.name === 'ForbiddenError' ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

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

    await assertCan(user, 'manage', { resource: 'user', organizationId: orgId });

    const body = await request.json();
    const validated = UserInviteSchema.parse(body);

    // Look up role in organization
    const role = await prisma.role.findFirstOrThrow({
      where: { organizationId: orgId, code: validated.roleCode },
    });

    const tenantClient = createTenantClient(orgId, user);
    const invitation = await tenantClient.invitations.create({
      email: validated.email,
      roleId: role.id,
      token: `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      invitedById: userId,
    });

    // Write audit log
    await logPrivilegedAction({
      organizationId: orgId,
      actorId: userId,
      action: 'USER_INVITE',
      entityType: 'Invitation',
      entityId: invitation.id,
      metadata: { email: validated.email, role: validated.roleCode },
    });

    return NextResponse.json({ success: true, invitation });
  } catch (error: any) {
    const status = error.name === 'ZodError' ? 400 : error.name === 'ForbiddenError' ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function PATCH(request: NextRequest) {
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

    await assertCan(user, 'manage', { resource: 'user', organizationId: orgId });

    const body = await request.json();
    const tenantClient = createTenantClient(orgId, user);

    if (body.action === 'CHANGE_STATUS') {
      const { userId: targetUserId, status } = UserStatusUpdateSchema.parse(body);
      if (status === 'SUSPENDED') {
        await tenantClient.memberships.suspend(targetUserId);
        await logPrivilegedAction({
          organizationId: orgId,
          actorId: userId,
          action: 'USER_SUSPEND',
          entityType: 'Membership',
          entityId: targetUserId,
          metadata: { targetUserId },
        });
      } else {
        await tenantClient.memberships.restore(targetUserId);
        await logPrivilegedAction({
          organizationId: orgId,
          actorId: userId,
          action: 'USER_RESTORE',
          entityType: 'Membership',
          entityId: targetUserId,
          metadata: { targetUserId },
        });
      }
      return NextResponse.json({ success: true, status });
    }

    if (body.action === 'CHANGE_ROLE') {
      const { userId: targetUserId, roleCode: newRoleCode } = UserRoleChangeSchema.parse(body);
      const newRole = await prisma.role.findFirstOrThrow({
        where: { organizationId: orgId, code: newRoleCode },
      });

      await tenantClient.memberships.changeRole(targetUserId, newRole.id);
      await logPrivilegedAction({
        organizationId: orgId,
        actorId: userId,
        action: 'ROLE_CHANGE',
        entityType: 'Membership',
        entityId: targetUserId,
        metadata: { targetUserId, newRole: newRoleCode },
      });

      return NextResponse.json({ success: true, newRole: newRoleCode });
    }

    return NextResponse.json({ error: 'Invalid PATCH action' }, { status: 400 });
  } catch (error: any) {
    const status = error.name === 'ZodError' ? 400 : error.name === 'ForbiddenError' ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
