import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const orgs = await prisma.organization.findMany({
      where: { deletedAt: null },
      include: {
        verifiedDomains: true,
      },
    });

    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      include: {
        memberships: {
          include: {
            role: true,
            organization: true,
          },
        },
        profiles: true,
      },
    });

    const batches = await prisma.batch.findMany({
      where: { deletedAt: null },
      include: {
        organization: true,
        trainer: true,
      },
    });

    const auditLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        actor: true,
        impersonator: true,
        organization: true,
      },
    });

    const revenues = await prisma.platformRevenue.findMany({
      include: {
        organization: true,
      },
    });

    // Format BigInt for JSON serialization
    const serializedRevenues = revenues.map((r) => ({
      ...r,
      amountPaise: r.amountPaise.toString(),
    }));

    return NextResponse.json({
      organizations: orgs,
      users,
      batches,
      auditLogs,
      revenues: serializedRevenues,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
