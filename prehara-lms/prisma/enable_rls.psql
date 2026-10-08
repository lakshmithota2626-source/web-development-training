-- Enable RLS on all tenant-scoped tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_revenues ENABLE ROW LEVEL SECURITY;

-- Note: User table is global identity, accounts are auth-provider linked.

-- Create tenant isolation policy on batches as defense-in-depth example
DROP POLICY IF EXISTS tenant_batch_isolation ON batches;
CREATE POLICY tenant_batch_isolation ON batches
  USING (
    current_setting('app.current_organization_id', true) IS NULL 
    OR organization_id::text = current_setting('app.current_organization_id', true)
  );

DROP POLICY IF EXISTS tenant_profile_isolation ON profiles;
CREATE POLICY tenant_profile_isolation ON profiles
  USING (
    current_setting('app.current_organization_id', true) IS NULL 
    OR organization_id::text = current_setting('app.current_organization_id', true)
  );
