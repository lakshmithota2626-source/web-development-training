import { prisma } from '@/lib/db/prisma';
import { AuthContextUser } from '@/lib/types/auth';

export interface AuditLogEntry {
  organizationId: string;
  actorId: string;
  impersonatorId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}

/**
 * Audit Logger: writes an immutable audit row for every privileged action.
 * Specifically audits impersonation when an admin impersonates another user.
 */
export async function logPrivilegedAction(entry: AuditLogEntry) {
  return prisma.auditLog.create({
    data: {
      organizationId: entry.organizationId,
      actorId: entry.actorId,
      impersonatorId: entry.impersonatorId ?? null,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      metadata: (entry.metadata ?? {}) as any,
    },
  });
}

/**
 * Impersonation helper that begins an impersonation session and writes an audit row.
 */
export async function startImpersonation(
  platformAdmin: AuthContextUser,
  targetUserId: string,
  targetOrgId: string,
  reason: string
) {
  if (platformAdmin.roleCode !== 'PLATFORM_ADMIN') {
    throw new Error('Only PLATFORM_ADMIN can initiate impersonation');
  }

  // Create audit log row immediately
  const auditRow = await logPrivilegedAction({
    organizationId: targetOrgId,
    actorId: targetUserId, // Acting as target
    impersonatorId: platformAdmin.id, // Audited impersonator
    action: 'IMPERSONATION_START',
    entityType: 'User',
    entityId: targetUserId,
    metadata: {
      reason,
      impersonatedAt: new Date().toISOString(),
      adminEmail: platformAdmin.email,
    },
  });

  return {
    success: true,
    auditRow,
    impersonatedSession: {
      userId: targetUserId,
      organizationId: targetOrgId,
      impersonatorId: platformAdmin.id,
    },
  };
}
