export type RoleCode =
  | 'GUEST'
  | 'STUDENT'
  | 'TRAINER'
  | 'ORG_ADMIN'
  | 'PLATFORM_ADMIN';

export interface AuthContextUser {
  id: string;
  email: string;
  name?: string | null;
  activeOrganizationId: string;
  roleCode: RoleCode;
  impersonatorId?: string | null;
  twoFactorVerified?: boolean;
}

export interface ResourceTarget {
  resource: string; // e.g. "profile", "batch", "grading", "announcement", "revenue", "ai_chat", "user"
  organizationId?: string;
  ownerId?: string | null;
  trainerId?: string | null;
  attributes?: Record<string, unknown>;
}

export interface PermissionCheckResult {
  allowed: boolean;
  reason?: 'TENANT_MISMATCH' | 'NOT_OWNER' | 'ROLE_PERMISSION_DENIED' | 'UNAUTHENTICATED';
}
