import { NextRequest, NextResponse } from 'next/server';
import { createTenantClient } from '@/lib/db/tenant-client';
import { ConsentRecordSchema, ConsentWithdrawSchema } from '@/lib/validations';
import { AuthContextUser } from '@/lib/types/auth';

export async function GET(request: NextRequest) {
  try {
    const orgId = request.headers.get('x-organization-id');
    const userId = request.headers.get('x-user-id');
    const roleCode = (request.headers.get('x-role-code') || 'GUEST') as any;

    if (!orgId || !userId || roleCode === 'GUEST') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const tenantClient = createTenantClient(orgId);
    const history = await tenantClient.consentRecords.getHistory(userId);

    return NextResponse.json({ consentHistory: history });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const orgId = request.headers.get('x-organization-id');
    const userId = request.headers.get('x-user-id');
    const roleCode = (request.headers.get('x-role-code') || 'GUEST') as any;

    if (!orgId || !userId || roleCode === 'GUEST') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const validated = ConsentRecordSchema.parse(body);

    const tenantClient = createTenantClient(orgId);
    const record = await tenantClient.consentRecords.create({
      userId,
      purpose: validated.purpose,
      policyVersion: validated.policyVersion,
      ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: request.headers.get('user-agent') || 'Browser',
    });

    return NextResponse.json({ success: true, record });
  } catch (error: any) {
    const status = error.name === 'ZodError' ? 400 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const orgId = request.headers.get('x-organization-id');
    const userId = request.headers.get('x-user-id');
    const roleCode = (request.headers.get('x-role-code') || 'GUEST') as any;

    if (!orgId || !userId || roleCode === 'GUEST') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const validated = ConsentWithdrawSchema.parse(body);

    const tenantClient = createTenantClient(orgId);
    await tenantClient.consentRecords.withdraw(userId, validated.purpose);

    return NextResponse.json({ success: true, message: `Consent for ${validated.purpose} withdrawn` });
  } catch (error: any) {
    const status = error.name === 'ZodError' ? 400 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
