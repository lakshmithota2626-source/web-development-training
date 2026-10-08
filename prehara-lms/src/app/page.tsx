'use client';

import React, { useState, useEffect } from 'react';
import { RoleCode } from '@/lib/types/auth';
import { formatPaiseToRupees, formatUtcToIst } from '@/lib/utils/formatters';

interface Org {
  id: string;
  name: string;
  slug: string;
  customDomain?: string | null;
  primaryColor?: string | null;
  accentColor?: string | null;
  isDefault: boolean;
}

interface MemberUser {
  id: string;
  name: string | null;
  email: string;
  memberships: {
    organizationId: string;
    role: { code: RoleCode; name: string };
    status: 'ACTIVE' | 'SUSPENDED';
  }[];
  profiles: {
    organizationId: string;
    college?: string | null;
    branch?: string | null;
    graduationYear?: number | null;
    skills: string[];
    githubHandle?: string | null;
    resumeUrl?: string | null;
  }[];
}

export default function PreharaLmsStage1() {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<Org[]>([]);
  const [users, setUsers] = useState<MemberUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [revenues, setRevenues] = useState<any[]>([]);

  // Active Session State
  const [activeOrgId, setActiveOrgId] = useState<string>('');
  const [activeRole, setActiveRole] = useState<RoleCode>('STUDENT');
  const [activeUserId, setActiveUserId] = useState<string>('');
  const [impersonatorId, setImpersonatorId] = useState<string | null>(null);

  // Modals & Panels
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Forms
  const [profileForm, setProfileForm] = useState({
    college: 'IIT Bombay',
    branch: 'Computer Science',
    graduationYear: 2026,
    skills: 'TypeScript, React, PostgreSQL',
    githubHandle: 'aarav-patel',
    resumeUrl: 'https://storage.prehara.com/resumes/aarav_resume.pdf',
  });

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<RoleCode>('STUDENT');
  const [csvText, setCsvText] = useState(
    'email,name,roleCode,college,branch,graduationYear\nrahul@iitb.ac.in,Rahul V,STUDENT,IIT Bombay,Mechanical,2026\npriya@iitb.ac.in,Priya N,STUDENT,IIT Bombay,Civil,2026'
  );
  const [csvStatus, setCsvStatus] = useState<string>('');
  const [impersonateReason, setImpersonateReason] = useState('');
  const [impersonateTarget, setImpersonateTarget] = useState('');

  // Fetch initial seed data
  useEffect(() => {
    fetch('/api/state')
      .then((res) => res.json())
      .then((data) => {
        setOrganizations(data.organizations || []);
        setUsers(data.users || []);
        setAuditLogs(data.auditLogs || []);
        setRevenues(data.revenues || []);

        if (data.organizations?.length > 0) {
          // Default to IIT Bombay
          const iitb = data.organizations.find((o: Org) => o.slug === 'iitb') || data.organizations[0];
          setActiveOrgId(iitb.id);
        }

        // Set initial user (student 1)
        const studentUser = data.users?.find((u: MemberUser) => u.email === 'student1@iitb.ac.in');
        if (studentUser) {
          setActiveUserId(studentUser.id);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load state', err);
        setLoading(false);
      });
  }, []);

  const activeOrg = organizations.find((o) => o.id === activeOrgId) || organizations[0];
  const activeUser = users.find((u) => u.id === activeUserId);

  // Switch role helper
  const handleRoleChange = (role: RoleCode) => {
    setActiveRole(role);
    if (role === 'GUEST') {
      setActiveUserId('');
      return;
    }
    // Find matching user for role
    const matched = users.find((u) =>
      u.memberships.some((m) => m.organizationId === activeOrgId && m.role.code === role)
    );
    if (matched) {
      setActiveUserId(matched.id);
    }
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-organization-id': activeOrgId,
          'x-user-id': activeUserId,
          'x-role-code': activeRole,
        },
        body: JSON.stringify({
          college: profileForm.college,
          branch: profileForm.branch,
          graduationYear: Number(profileForm.graduationYear),
          skills: profileForm.skills.split(',').map((s) => s.trim()),
          githubHandle: profileForm.githubHandle,
          resumeUrl: profileForm.resumeUrl,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully!');
        setShowProfileModal(false);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error saving profile: ${err.message}`);
    }
  };

  // Consent Record
  const handleGrantConsent = async (purpose: string) => {
    const res = await fetch('/api/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organization-id': activeOrgId,
        'x-user-id': activeUserId,
        'x-role-code': activeRole,
      },
      body: JSON.stringify({
        purpose,
        policyVersion: 'v1.1.0',
      }),
    });
    if (res.ok) {
      alert(`Consent recorded for ${purpose} with timestamp in IST.`);
    }
  };

  const handleWithdrawConsent = async (purpose: string) => {
    const res = await fetch('/api/consent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-organization-id': activeOrgId,
        'x-user-id': activeUserId,
        'x-role-code': activeRole,
      },
      body: JSON.stringify({ purpose }),
    });
    if (res.ok) {
      alert(`Consent withdrawal logged for ${purpose}.`);
    }
  };

  // CSV Bulk Import
  const handleCsvImport = async () => {
    try {
      const lines = csvText.trim().split('\n');
      const headers = lines[0].split(',').map((h) => h.trim());
      const rows = lines.slice(1).map((line) => {
        const parts = line.split(',').map((p) => p.trim());
        return {
          email: parts[0],
          name: parts[1],
          roleCode: parts[2] as RoleCode,
          college: parts[3],
          branch: parts[4],
          graduationYear: Number(parts[5]),
        };
      });

      const res = await fetch('/api/admin/users/csv-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-organization-id': activeOrgId,
          'x-user-id': activeUserId,
          'x-role-code': activeRole,
        },
        body: JSON.stringify({ rows }),
      });
      const data = await res.json();
      if (res.ok) {
        setCsvStatus(`Successfully imported ${data.imported} users into ${activeOrg?.name}!`);
      } else {
        setCsvStatus(`Import failed: ${data.error}`);
      }
    } catch (e: any) {
      setCsvStatus(`CSV Parse error: ${e.message}`);
    }
  };

  // Audited Impersonation
  const handleStartImpersonation = async () => {
    if (!impersonateTarget || !impersonateReason) {
      alert('Please select a target user and state an audited reason.');
      return;
    }
    const res = await fetch('/api/admin/impersonate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organization-id': activeOrgId,
        'x-user-id': activeUserId,
        'x-role-code': activeRole,
      },
      body: JSON.stringify({
        targetUserId: impersonateTarget,
        reason: impersonateReason,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setImpersonatorId(activeUserId);
      setActiveUserId(data.impersonatedUser.id);
      setActiveRole(data.impersonatedUser.roleCode);
      alert(`Impersonation started. Audit row created ID: ${data.auditLogId}`);
    } else {
      alert(`Impersonation failed: ${data.error}`);
    }
  };

  const handleStopImpersonation = () => {
    if (impersonatorId) {
      setActiveUserId(impersonatorId);
      setActiveRole('PLATFORM_ADMIN');
      setImpersonatorId(null);
      alert('Returned to Platform Admin session.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="text-xl font-medium tracking-wide animate-pulse">
          Loading Prehara LMS Stage 1...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* WCAG 2.2 AA Skip Link */}
      <a href="#main-content" className="skip-to-content focus:outline-none">
        Skip to main content
      </a>

      {/* Impersonation Banner */}
      {impersonatorId && (
        <div
          role="alert"
          className="bg-amber-500 text-slate-950 px-4 py-2 font-semibold text-sm flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span className="bg-slate-950 text-amber-400 text-xs px-2 py-0.5 rounded font-mono uppercase">
              Audited Session
            </span>
            <span>
              You are impersonating <strong>{activeUser?.name || activeUser?.email}</strong>. All privileged actions are recorded in the audit log.
            </span>
          </div>
          <button
            onClick={handleStopImpersonation}
            className="bg-slate-950 text-white hover:bg-slate-800 text-xs px-3 py-1 rounded transition"
          >
            Exit Impersonation
          </button>
        </div>
      )}

      {/* TOP BAR: Organization & Role Context Switcher */}
      <header
        className="border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4"
        style={{
          borderTop: `4px solid ${activeOrg?.accentColor || '#2563EB'}`,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md"
            style={{ backgroundColor: activeOrg?.accentColor || '#2563EB' }}
          >
            {activeOrg?.name?.substring(0, 2).toUpperCase() || 'PL'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">{activeOrg?.name}</h1>
              {activeOrg?.isDefault && (
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  Default D2C
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Subdomain: <code className="text-blue-400">{activeOrg?.slug}.prehara.in</code>
              {activeOrg?.customDomain && (
                <span className="ml-2 text-emerald-400">({activeOrg?.customDomain})</span>
              )}
            </p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Org Selector */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg p-1.5">
            <span className="text-slate-400 px-1 font-medium">Tenant:</span>
            <select
              aria-label="Select Tenant Organisation"
              value={activeOrgId}
              onChange={(e) => setActiveOrgId(e.target.value)}
              className="bg-slate-950 text-white text-xs px-2 py-1 rounded border border-slate-700 focus:ring-2 focus:ring-blue-500"
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name} ({org.slug})
                </option>
              ))}
            </select>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg p-1.5">
            <span className="text-slate-400 px-1 font-medium">Role:</span>
            {(['GUEST', 'STUDENT', 'TRAINER', 'ORG_ADMIN', 'PLATFORM_ADMIN'] as RoleCode[]).map(
              (role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`px-2.5 py-1 rounded font-medium transition text-xs ${
                    activeRole === role
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {role.replace('_', ' ')}
                </button>
              )
            )}
          </div>

          {/* Action Modals buttons */}
          {activeRole !== 'GUEST' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowProfileModal(true)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                Profile & Resume
              </button>
              <button
                onClick={() => setShowConsentModal(true)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                Consent Records
              </button>
              {(activeRole === 'ORG_ADMIN' || activeRole === 'PLATFORM_ADMIN') && (
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="text-xs bg-purple-900/60 hover:bg-purple-800 text-purple-200 px-3 py-1.5 rounded-lg border border-purple-700 transition font-medium"
                >
                  Admin Tools & CSV
                </button>
              )}
              {activeRole === 'PLATFORM_ADMIN' && (
                <button
                  onClick={() => setShowAuditModal(true)}
                  className="text-xs bg-amber-900/60 hover:bg-amber-800 text-amber-200 px-3 py-1.5 rounded-lg border border-amber-700 transition font-medium"
                >
                  Audit Trail
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main id="main-content" className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* User Identity Banner */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300">
              {activeUser?.name?.substring(0, 1) || 'G'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {activeUser?.name || 'Guest Visitor'}{' '}
                <span className="ml-2 text-xs font-mono bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">
                  {activeRole}
                </span>
              </p>
              <p className="text-xs text-slate-400">
                {activeUser?.email || 'Unauthenticated session'} • Active Tenant ID:{' '}
                <span className="font-mono text-slate-300">{activeOrgId}</span>
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div>Current Time: <span className="text-slate-300 font-mono">{formatUtcToIst(new Date())}</span></div>
            <div className="text-emerald-400">Security: PostgreSQL RLS Active & Tenant Scoped</div>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 1: GUEST HOME */}
        {/* ------------------------------------------------------------------- */}
        {activeRole === 'GUEST' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Industry-Ready Tech Training by Prehara
              </h2>
              <p className="text-slate-300 max-w-2xl text-sm leading-relaxed mb-6">
                Bridging the gap between college curricula and high-impact engineering teams.
                Explore our industry-benchmarked training modules below.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => alert('Sign-in flow will verify against student/trainer membership')}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
                >
                  Student Login
                </button>
                <a
                  href="#contact-form"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-5 py-2.5 rounded-lg transition border border-slate-700"
                >
                  Contact Placement Cell
                </a>
              </div>
            </div>

            {/* Public Catalogue */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Public Course Catalogue</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Full Stack Java & Cloud Microservices',
                    duration: '16 Weeks',
                    stack: 'Spring Boot, Docker, AWS, PostgreSQL',
                  },
                  {
                    title: 'Modern TypeScript & Next.js Systems',
                    duration: '12 Weeks',
                    stack: 'Next.js, Node.js, Prisma, Redis',
                  },
                  {
                    title: 'DevOps & Site Reliability Engineering',
                    duration: '10 Weeks',
                    stack: 'Kubernetes, Terraform, CI/CD, Observability',
                  },
                ].map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold text-blue-400 bg-blue-950/80 border border-blue-800 px-2.5 py-0.5 rounded-full">
                        {course.duration}
                      </span>
                      <h4 className="text-base font-bold text-white mt-3 mb-2">{course.title}</h4>
                      <p className="text-xs text-slate-400 mb-4">{course.stack}</p>
                    </div>
                    <button
                      onClick={() => alert(`Enrolling in: ${course.title}`)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg font-medium transition"
                    >
                      View Syllabus Teaser
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Announcements & Session Teaser */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-3">Public Announcements</h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="pb-3 border-b border-slate-800">
                    <span className="text-blue-400 font-semibold">Oct 2026 Batch:</span> IIT Bombay & NIT Karnataka campus placements sprint applications open.
                  </li>
                  <li>
                    <span className="text-emerald-400 font-semibold">Webinar:</span> "Zero to Production with PostgreSQL & Redis" on Saturday, 6:00 PM IST.
                  </li>
                </ul>
              </div>

              {/* Contact Form */}
              <div id="contact-form" className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-2">College & Student Enquiries</h3>
                {contactSubmitted ? (
                  <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs p-3 rounded-lg">
                    Thank you! Your inquiry has been dispatched to the placement coordinator.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="space-y-3 text-xs"
                  >
                    <div>
                      <label className="block text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">College Email</label>
                      <input
                        type="email"
                        required
                        placeholder="priya@college.ac.in"
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition"
                    >
                      Submit Contact Form
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 2: STUDENT HOME */}
        {/* ------------------------------------------------------------------- */}
        {activeRole === 'STUDENT' && (
          <section className="space-y-6">
            {/* Resume Learning Card */}
            <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-800/40 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs bg-blue-500/20 text-blue-300 font-medium px-2.5 py-0.5 rounded border border-blue-500/30">
                  Resume Learning
                </span>
                <h2 className="text-xl font-bold text-white mt-2">
                  Module 4: PostgreSQL Indexing & Query Optimisation
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Batch: Full Stack Java & Cloud (FS-2026-A) • Next up: B-Tree vs Hash Indexes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">72% Completed</div>
                  <div className="text-xs text-emerald-400">🔥 14-Day Streak</div>
                </div>
                <button
                  onClick={() => alert('Resuming interactive IDE module...')}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition"
                >
                  Continue Module
                </button>
              </div>
            </div>

            {/* Student Stats & Streak */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-400">Overall Progress</div>
                <div className="text-2xl font-bold text-white mt-1">72%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-400">Practice Streak</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">14 Days</div>
                <div className="text-xs text-slate-500 mt-1">Target: 30 days</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-400">Assigned Labs</div>
                <div className="text-2xl font-bold text-white mt-1">18 / 24</div>
                <div className="text-xs text-emerald-400 mt-1">6 graded A+</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-400">Readiness Score</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">84 / 100</div>
                <div className="text-xs text-slate-500 mt-1">Industry Benchmarked</div>
              </div>
            </div>

            {/* Live Sessions & Batch Announcements */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <h3 className="text-base font-bold text-white mb-3">Your Live Sessions</h3>
                <div className="space-y-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-semibold text-white">
                        System Design: Database Sharding
                      </div>
                      <div className="text-xs text-slate-400">Today, 5:30 PM IST • Dr. Ramesh</div>
                    </div>
                    <button
                      onClick={() => alert('Joining Live WebRTC Classroom...')}
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded"
                    >
                      Join Live
                    </button>
                  </div>
                </div>
              </div>

              {/* Support Ticket */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <h3 className="text-base font-bold text-white mb-2">Raise Support Ticket</h3>
                {ticketSubmitted ? (
                  <div className="bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs p-3 rounded">
                    Ticket #PRH-882 created. Your trainer has been notified.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setTicketSubmitted(true);
                    }}
                    className="space-y-3 text-xs"
                  >
                    <input
                      type="text"
                      placeholder="Issue summary (e.g. Docker container crash on Lab 4)"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      rows={2}
                      placeholder="Detailed description..."
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition"
                    >
                      Submit Ticket
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 3: TRAINER HOME */}
        {/* ------------------------------------------------------------------- */}
        {activeRole === 'TRAINER' && (
          <section className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Trainer Command Center</h2>
                  <p className="text-xs text-slate-400">
                    Assigned Batch: Full Stack Java & Cloud (FS-2026-A) • Dr. Ramesh
                  </p>
                </div>
                <button
                  onClick={() => alert('Initiating live session host broadcast...')}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Start Live Session Host
                </button>
              </div>

              {/* Batch Aggregate Progress */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Batch Aggregate Progress</div>
                  <div className="text-2xl font-bold text-blue-400 mt-1">68.4%</div>
                  <div className="text-xs text-slate-500 mt-1">42 active students</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Pending Grading Queue</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">7 Submissions</div>
                  <div className="text-xs text-slate-500 mt-1">Lab 4: PostgreSQL Indexing</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Batch Support Queue</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">2 Open Tickets</div>
                  <div className="text-xs text-slate-500 mt-1">Avg response time: 24 mins</div>
                </div>
              </div>

              {/* Pending Grading Queue Table */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Pending Grading Submissions</h3>
                <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Student</th>
                        <th className="p-3">Assignment</th>
                        <th className="p-3">Submitted (IST)</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="p-3 text-white font-medium">Aarav Patel</td>
                        <td className="p-3 text-slate-300">Lab 4: PostgreSQL B-Tree Benchmark</td>
                        <td className="p-3 text-slate-400">{formatUtcToIst(new Date())}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert('Grade assigned: A+ (100/100)')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded"
                          >
                            Grade Now
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-medium">Diya Sharma</td>
                        <td className="p-3 text-slate-300">Lab 4: PostgreSQL B-Tree Benchmark</td>
                        <td className="p-3 text-slate-400">{formatUtcToIst(new Date())}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert('Grade assigned: A (92/100)')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded"
                          >
                            Grade Now
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 4: ORG ADMIN HOME */}
        {/* ------------------------------------------------------------------- */}
        {activeRole === 'ORG_ADMIN' && (
          <section className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Organisation Administration — {activeOrg?.name}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Scoped strictly to your college. Grading queue and platform revenues are isolated.
                  </p>
                </div>
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Manage Users & Bulk Import
                </button>
              </div>

              {/* Org Admin Metrics */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Org Aggregate Progress</div>
                  <div className="text-2xl font-bold text-blue-400 mt-1">74.2%</div>
                  <div className="text-xs text-slate-500 mt-1">Across 3 active batches</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Industry-Readiness Index</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">82.8 / 100</div>
                  <div className="text-xs text-slate-500 mt-1">Placement benchmark met</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Pending Invoices</div>
                  <div className="text-2xl font-bold text-white mt-1">₹0.00 Due</div>
                  <div className="text-xs text-emerald-400 mt-1">Paid in full (Q1 2026)</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Support Queue</div>
                  <div className="text-2xl font-bold text-white mt-1">0 Escalations</div>
                  <div className="text-xs text-slate-500 mt-1">Normal SLA</div>
                </div>
              </div>

              {/* Readiness Report Table */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">College Batch Readiness Report</h3>
                <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Batch Name</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Enrolled</th>
                        <th className="p-3">Completion Rate</th>
                        <th className="p-3">Placement Ready</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="p-3 text-white font-medium">FS-2026-A</td>
                        <td className="p-3 text-slate-300">Computer Science & Engg</td>
                        <td className="p-3 text-slate-300">42</td>
                        <td className="p-3 text-blue-400 font-semibold">88%</td>
                        <td className="p-3 text-emerald-400 font-semibold">38 / 42 (90%)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-medium">DEVOPS-2026-B</td>
                        <td className="p-3 text-slate-300">Electrical Engineering</td>
                        <td className="p-3 text-slate-300">35</td>
                        <td className="p-3 text-blue-400 font-semibold">76%</td>
                        <td className="p-3 text-emerald-400 font-semibold">28 / 35 (80%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 5: PLATFORM ADMIN HOME */}
        {/* ------------------------------------------------------------------- */}
        {activeRole === 'PLATFORM_ADMIN' && (
          <section className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Prehara Platform Master Console</h2>
                  <p className="text-xs text-slate-400">
                    Unscoped platform oversight • Audited Impersonation • Revenue Ledger
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAuditModal(true)}
                    className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    View Audit Logs ({auditLogs.length})
                  </button>
                </div>
              </div>

              {/* Platform Metrics */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Platform Revenue (Paise format)</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    {revenues.length > 0
                      ? formatPaiseToRupees(BigInt(revenues[0].amountPaise))
                      : '₹5,00,000.00'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Stored as integer paise</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Partner Colleges</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {organizations.length} Tenancies
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Auto-join domains verified</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Platform Users</div>
                  <div className="text-xl font-bold text-white mt-1">{users.length} Identities</div>
                  <div className="text-xs text-slate-500 mt-1">Across all organisations</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Feature Flags</div>
                  <div className="text-xl font-bold text-blue-400 mt-1">4 Active</div>
                  <div className="text-xs text-slate-500 mt-1">Stage 1 Core Guardrails</div>
                </div>
              </div>

              {/* Impersonation Control Panel */}
              <div className="bg-slate-950 border border-amber-900/40 p-4 rounded-lg mb-6">
                <h3 className="text-sm font-bold text-amber-300 mb-2">Audited Impersonation</h3>
                <p className="text-xs text-slate-400 mb-3">
                  Initiate a temporary session on behalf of a student or trainer. All actions write an audit row recording your admin identity as impersonator.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <select
                    aria-label="Select target user for impersonation"
                    value={impersonateTarget}
                    onChange={(e) => setImpersonateTarget(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white"
                  >
                    <option value="">Select Target User...</option>
                    {users
                      .filter((u) => u.email !== activeUser?.email)
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name || u.email} ({u.email})
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Mandatory reason for audit..."
                    value={impersonateReason}
                    onChange={(e) => setImpersonateReason(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white"
                  />
                  <button
                    onClick={handleStartImpersonation}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-4 py-2 rounded transition"
                  >
                    Start Audited Impersonation
                  </button>
                </div>
              </div>

              {/* Global Organisations Table */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Platform Tenancies</h3>
                <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Organisation</th>
                        <th className="p-3">Slug (Subdomain)</th>
                        <th className="p-3">Verified Domains</th>
                        <th className="p-3">Type</th>
                        <th className="p-3 text-right">Created (IST)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {organizations.map((org) => (
                        <tr key={org.id}>
                          <td className="p-3 text-white font-medium">{org.name}</td>
                          <td className="p-3 text-blue-400 font-mono">{org.slug}.prehara.in</td>
                          <td className="p-3 text-emerald-400 font-mono">
                            {org.slug === 'iitb' ? 'iitb.ac.in (Verified)' : 'Default'}
                          </td>
                          <td className="p-3 text-slate-300">
                            {org.isDefault ? 'D2C Default' : 'College Partner'}
                          </td>
                          <td className="p-3 text-right text-slate-400">
                            {formatUtcToIst(new Date())}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* --------------------------------------------------------------------- */}
      {/* MODAL 1: PROFILE & RESUME */}
      {/* --------------------------------------------------------------------- */}
      {showProfileModal && (
        <div
          role="dialog"
          aria-labelledby="profile-title"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 id="profile-title" className="text-lg font-bold text-white">
                Student Profile & Resume
              </h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">College</label>
                <input
                  type="text"
                  value={profileForm.college}
                  onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Branch / Specialisation</label>
                <input
                  type="text"
                  value={profileForm.branch}
                  onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Graduation Year</label>
                  <input
                    type="number"
                    value={profileForm.graduationYear}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, graduationYear: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">GitHub Handle</label>
                  <input
                    type="text"
                    value={profileForm.githubHandle}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, githubHandle: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={profileForm.skills}
                  onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Resume Upload URL</label>
                <input
                  type="url"
                  value={profileForm.resumeUrl}
                  onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 font-semibold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* MODAL 2: CONSENT RECORDS (Non-Boolean, Purpose + Version + Withdrawal) */}
      {/* --------------------------------------------------------------------- */}
      {showConsentModal && (
        <div
          role="dialog"
          aria-labelledby="consent-title"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h2 id="consent-title" className="text-lg font-bold text-white">
                Consent Governance & Records
              </h2>
              <button
                onClick={() => setShowConsentModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-400">
              In accordance with DPDP and GDPR, consent is stored as historical event records with policy versioning and withdrawal timestamps, never as a boolean.
            </p>
            <div className="space-y-3">
              {[
                { purpose: 'TERMS_OF_SERVICE', title: 'Terms of Service', version: 'v1.0.0' },
                { purpose: 'PRIVACY_POLICY', title: 'Privacy Policy', version: 'v1.1.0' },
                { purpose: 'DATA_PROCESSING', title: 'Campus Placement Data Processing', version: 'v1.0.0' },
              ].map((item) => (
                <div
                  key={item.purpose}
                  className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-slate-400">Version: {item.version} • Granted UTC</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGrantConsent(item.purpose)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded font-medium"
                    >
                      Consent
                    </button>
                    <button
                      onClick={() => handleWithdrawConsent(item.purpose)}
                      className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-800 px-2.5 py-1 rounded font-medium"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* MODAL 3: ADMIN TOOLS & CSV BULK IMPORT */}
      {/* --------------------------------------------------------------------- */}
      {showAdminModal && (
        <div
          role="dialog"
          aria-labelledby="admin-title"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h2 id="admin-title" className="text-lg font-bold text-white">
                Admin User Management & CSV Import
              </h2>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Invite User */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white text-sm">Invite Single User to {activeOrg?.name}</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="student@college.ac.in"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white"
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as RoleCode)}
                  className="bg-slate-900 border border-slate-800 rounded px-2 text-white"
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="TRAINER">TRAINER</option>
                  <option value="ORG_ADMIN">ORG_ADMIN</option>
                </select>
                <button
                  onClick={async () => {
                    if (!inviteEmail) return;
                    const res = await fetch('/api/admin/users', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'x-organization-id': activeOrgId,
                        'x-user-id': activeUserId,
                        'x-role-code': activeRole,
                      },
                      body: JSON.stringify({ email: inviteEmail, roleCode: inviteRole }),
                    });
                    if (res.ok) alert(`Invitation sent to ${inviteEmail}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold"
                >
                  Invite
                </button>
              </div>
            </div>

            {/* CSV Bulk Import */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white text-sm">
                CSV Bulk Import (Scoped to {activeOrg?.name})
              </h3>
              <p className="text-slate-400">
                Paste CSV lines with columns: <code>email, name, roleCode, college, branch, graduationYear</code>
              </p>
              <textarea
                rows={4}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 font-mono text-[11px]"
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={handleCsvImport}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded"
                >
                  Run Scoped CSV Import
                </button>
                {csvStatus && <span className="text-emerald-400 font-medium">{csvStatus}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* MODAL 4: AUDIT TRAIL */}
      {/* --------------------------------------------------------------------- */}
      {showAuditModal && (
        <div
          role="dialog"
          aria-labelledby="audit-title"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h2 id="audit-title" className="text-lg font-bold text-white">
                Immutable Privileged Action Audit Trail
              </h2>
              <button
                onClick={() => setShowAuditModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0">
                  <tr>
                    <th className="p-2.5">Action</th>
                    <th className="p-2.5">Actor</th>
                    <th className="p-2.5">Impersonator</th>
                    <th className="p-2.5">Target Entity</th>
                    <th className="p-2.5 text-right">Timestamp (IST)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="p-2.5 font-mono text-amber-400">{log.action}</td>
                      <td className="p-2.5 text-slate-300">{log.actor?.email || log.actorId}</td>
                      <td className="p-2.5 text-rose-400 font-semibold">
                        {log.impersonator?.email || (log.impersonatorId ? 'PLATFORM ADMIN' : '—')}
                      </td>
                      <td className="p-2.5 text-slate-400">{log.entityType} ({log.entityId.substring(0, 8)}...)</td>
                      <td className="p-2.5 text-right text-slate-400">
                        {formatUtcToIst(log.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        Prehara LMS Stage 1 Architecture • Next.js App Router • PostgreSQL + Prisma RLS • Multi-Tenant Data Layer • WCAG 2.2 AA Compliant
      </footer>
    </div>
  );
}
