import { prisma } from '@/lib/db/prisma';
import { AuthContextUser, ResourceTarget } from '@/lib/types/auth';

export class ForbiddenError extends Error {
  public code: string;
  constructor(message: string, code: string = 'FORBIDDEN') {
    super(message);
    this.name = 'ForbiddenError';
    this.code = code;
  }
}

export class UnauthorizedError extends Error {
  public code: string;
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'UnauthorizedError';
    this.code = 'UNAUTHORIZED';
  }
}

/**
 * THE PREHARA PERMISSION ENGINE: can(user, action, resource)
 * 
 * Evaluates strictly in order:
 * 1. TENANT check
 * 2. OWNERSHIP check
 * 3. ROLE check (database-driven via RolePermission -> Permission)
 */
export async function can(
  user: AuthContextUser | null | undefined,
  action: string,
  target: ResourceTarget
): Promise<boolean> {
  // -------------------------------------------------------------------------
  // GUEST / UNAUTHENTICATED HANDLING
  // -------------------------------------------------------------------------
  const isGuest = !user || user.roleCode === 'GUEST';

  if (isGuest) {
    // Guests only have access to public resources
    const isPublicRead = ['catalogue', 'announcement_public', 'session_teaser'].includes(target.resource) && action === 'read';
    const isPublicContact = target.resource === 'contact_form' && action === 'create';

    if (isPublicRead || isPublicContact) {
      return true;
    }
    // Any other authenticated resource access is denied
    return false;
  }

  // -------------------------------------------------------------------------
  // 1. TENANT CHECK (First line of defense)
  // -------------------------------------------------------------------------
  const isPlatformAdmin = user.roleCode === 'PLATFORM_ADMIN';

  // If the resource specifies an organization_id, enforce strict tenant boundary
  if (target.organizationId) {
    const isSameTenant = user.activeOrganizationId === target.organizationId;

    if (!isSameTenant && !isPlatformAdmin) {
      // Cross-tenant access strictly forbidden
      return false;
    }
  }

  // Platform revenue is restricted to PLATFORM_ADMIN only (Org Admins get denied)
  if (target.resource === 'revenue' && !isPlatformAdmin) {
    return false;
  }

  // -------------------------------------------------------------------------
  // 2. OWNERSHIP CHECK (Second line of defense)
  // -------------------------------------------------------------------------

  // A. Student profile isolation: a student can only access/edit their own profile
  if (target.resource === 'profile' && user.roleCode === 'STUDENT') {
    if (target.ownerId && target.ownerId !== user.id) {
      return false;
    }
  }

  // B. Trainer batch isolation: a trainer can only manage/grade batches they are assigned to
  if (target.resource === 'batch' && user.roleCode === 'TRAINER') {
    if (target.trainerId !== user.id) {
      return false;
    }
  }

  // C. AI Chat privacy: student AI chats are strictly private (Org Admins cannot read)
  if (target.resource === 'ai_chat') {
    if (target.ownerId && target.ownerId !== user.id && !isPlatformAdmin) {
      return false;
    }
  }

  // -------------------------------------------------------------------------
  // 3. ROLE CHECK (Database-driven permissions, never hardcoded)
  // -------------------------------------------------------------------------

  // Always re-read membership and role from DB for privileged actions (never trust stale JWT)
  const membership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
      organizationId: user.activeOrganizationId,
      deletedAt: null,
    },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!membership || membership.status !== 'ACTIVE' || membership.deletedAt !== null) {
    // User is suspended or not a member of this active organization
    return false;
  }

  const role = membership.role;
  if (!role || role.deletedAt !== null) {
    return false;
  }

  // Platform admin has platform-wide wildcard capabilities within their role permissions
  if (role.code === 'PLATFORM_ADMIN') {
    return true;
  }

  // Check if there is an active Permission row linked to this Role in this Organization
  const hasPermission = role.rolePermissions.some((rp) => {
    const perm = rp.permission;
    const actionMatch = perm.action === action || perm.action === '*';
    const resourceMatch = perm.resource === target.resource || perm.resource === '*';
    return actionMatch && resourceMatch;
  });

  return hasPermission;
}

/**
 * Server-side route assertion helper.
 * Throws 401 Unauthorized or 403 Forbidden.
 */
export async function assertCan(
  user: AuthContextUser | null | undefined,
  action: string,
  target: ResourceTarget
): Promise<void> {
  if (!user || user.roleCode === 'GUEST') {
    const isAllowed = await can(user, action, target);
    if (!isAllowed) {
      throw new UnauthorizedError('Authentication required');
    }
    return;
  }

  const isAllowed = await can(user, action, target);
  if (!isAllowed) {
    throw new ForbiddenError(
      `Permission denied: role [${user.roleCode}] cannot perform [${action}] on resource [${target.resource}] in organization [${target.organizationId ?? user.activeOrganizationId}]`
    );
  }
}
