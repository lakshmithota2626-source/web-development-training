import { z } from 'zod';

// Profile Validation
export const ProfileUpdateSchema = z.object({
  college: z.string().min(2).max(150).optional(),
  branch: z.string().min(2).max(100).optional(),
  graduationYear: z.number().int().min(2000).max(2035).optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD').optional(),
  skills: z.array(z.string().min(1)).default([]),
  githubHandle: z.string().regex(/^[a-zA-Z0-9-]+$/, 'Invalid GitHub handle').optional().nullable(),
  resumeUrl: z.string().url('Must be a valid URL').optional().nullable(),
});

// Consent Record Validation (Do NOT store consent as a boolean)
export const ConsentRecordSchema = z.object({
  purpose: z.enum(['TERMS_OF_SERVICE', 'PRIVACY_POLICY', 'DATA_PROCESSING', 'MARKETING']),
  policyVersion: z.string().min(1, 'Policy version is required'),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export const ConsentWithdrawSchema = z.object({
  purpose: z.enum(['TERMS_OF_SERVICE', 'PRIVACY_POLICY', 'DATA_PROCESSING', 'MARKETING']),
});

// Admin User Management Validation
export const UserInviteSchema = z.object({
  email: z.string().email(),
  roleCode: z.enum(['STUDENT', 'TRAINER', 'ORG_ADMIN', 'PLATFORM_ADMIN']),
});

export const UserStatusUpdateSchema = z.object({
  userId: z.string().uuid(),
  status: z.enum(['ACTIVE', 'SUSPENDED']),
});

export const UserRoleChangeSchema = z.object({
  userId: z.string().uuid(),
  roleCode: z.enum(['STUDENT', 'TRAINER', 'ORG_ADMIN', 'PLATFORM_ADMIN']),
});

export const CsvBulkImportRowSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  roleCode: z.enum(['STUDENT', 'TRAINER', 'ORG_ADMIN']),
  college: z.string().optional(),
  branch: z.string().optional(),
  graduationYear: z.coerce.number().optional(),
});

export const ImpersonationRequestSchema = z.object({
  targetUserId: z.string().uuid(),
  reason: z.string().min(5, 'Audited reason is required for impersonation'),
});
