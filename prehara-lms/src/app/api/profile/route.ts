import { NextRequest, NextResponse } from 'next/server';
import { createTenantClient } from '@/lib/db/tenant-client';
import { assertCan } from '@/lib/permissions/can';
import { ProfileUpdateSchema } from '@/lib/validations';
import { AuthContextUser } from '@/lib/types/auth';

export async function GET(request: NextRequest) {
  try {
    const orgId = request.headers.get('x-organization-id');
    const userId = request.headers.get('x-user-id');
    const roleCode = (request.headers.get('x-role-code') || 'GUEST') as any;

    if (!orgId || !userId) {
      return NextResponse.json({ error: 'Missing organisation or user headers' }, { status: 401 });
    }

    const user: AuthContextUser = {
      id: userId,
      email: '',
      activeOrganizationId: orgId,
      roleCode,
    };

    // Permission assertion
    await assertCan(user, 'read', {
      resource: 'profile',
      organizationId: orgId,
      ownerId: userId,
    });

    const tenantClient = createTenantClient(orgId, user);
    const profile = await tenantClient.profiles.findUnique(userId);

    return NextResponse.json({ profile });
  } catch (error: any) {
    const status = error.name === 'UnauthorizedError' ? 401 : error.name === 'ForbiddenError' ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const orgId = request.headers.get('x-organization-id');
    const userId = request.headers.get('x-user-id');
    const roleCode = (request.headers.get('x-role-code') || 'GUEST') as any;

    if (!orgId || !userId) {
      return NextResponse.json({ error: 'Missing organisation or user headers' }, { status: 401 });
    }

    const user: AuthContextUser = {
      id: userId,
      email: '',
      activeOrganizationId: orgId,
      roleCode,
    };

    await assertCan(user, 'update', {
      resource: 'profile',
      organizationId: orgId,
      ownerId: userId,
    });

    const body = await request.json();
    const validated = ProfileUpdateSchema.parse(body);

    const tenantClient = createTenantClient(orgId, user);
    await tenantClient.profiles.update(userId, {
      ...validated,
      dateOfBirth: validated.dateOfBirth ? new Date(validated.dateOfBirth) : undefined,
    });

    const updated = await tenantClient.profiles.findUnique(userId);
    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    const status = error.name === 'ZodError' ? 400 : error.name === 'ForbiddenError' ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
