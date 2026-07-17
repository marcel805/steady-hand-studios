-- Steady Hand Studios - contractor portal schema.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists contractors (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  trade text,
  status text not null default 'active' check (status in ('active', 'disabled')),
  must_change_password boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  ticket text not null unique,
  title text not null,
  trade text not null,
  location text not null,
  day_rate text not null,
  duration text not null,
  call_date text not null,
  brief text not null,
  status text not null default 'open'
    check (status in ('open', 'shortlisted', 'awarded', 'paid')),
  created_by uuid references admin_users (id),
  created_at timestamptz not null default now()
);

create table if not exists nominations (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs (id) on delete cascade,
  contractor_id uuid not null references contractors (id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  unique (job_id, contractor_id)
);

-- Helper: is the current session an admin?
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$;

alter table admin_users enable row level security;
alter table contractors enable row level security;
alter table jobs enable row level security;
alter table nominations enable row level security;

-- admin_users: admins can see the admin list; no public/anon access at all.
create policy "admins can view admin_users" on admin_users
  for select using (is_admin());

-- contractors: a contractor can see/update their own row; admins see/manage all.
create policy "contractors can view own row" on contractors
  for select using (auth.uid() = id);
create policy "contractors can update own row" on contractors
  for update using (auth.uid() = id);
create policy "admins manage contractors" on contractors
  for all using (is_admin());

-- jobs: only logged-in contractors and admins can see jobs - never anonymous
-- visitors. This is the core rule that keeps job postings off the public site.
create policy "contractors can view jobs" on jobs
  for select using (auth.uid() is not null);
create policy "admins manage jobs" on jobs
  for all using (is_admin());

-- nominations: a contractor can nominate themselves and see their own
-- nominations; admins can see and manage all nominations.
create policy "contractors can view own nominations" on nominations
  for select using (auth.uid() = contractor_id);
create policy "contractors can nominate themselves" on nominations
  for insert with check (auth.uid() = contractor_id);
create policy "admins manage nominations" on nominations
  for all using (is_admin());

-- Migration: track which contractor won a job.
alter table jobs add column if not exists awarded_to uuid references contractors (id);

-- Migration: let any logged-in contractor see nomination *counts* per job
-- (not who nominated - RLS still hides other contractors' individual rows).
create or replace function job_nomination_counts()
returns table(job_id uuid, count bigint)
language sql
security definer
stable
as $$
  select job_id, count(*) from nominations group by job_id;
$$;

-- Migration: NDA-gated onboarding. A contractor login can only be
-- created from a signed NDA request - see admin/actions.ts.
create table if not exists nda_requests (
  id uuid primary key default gen_random_uuid(),
  token uuid not null default gen_random_uuid() unique,
  name text not null,
  email text not null,
  phone text,
  trade text,
  nda_version text not null,
  status text not null default 'pending' check (status in ('pending', 'signed')),
  signature_name text,
  signed_at timestamptz,
  signed_ip text,
  contractor_id uuid references contractors (id),
  created_by uuid references admin_users (id),
  created_at timestamptz not null default now()
);

alter table nda_requests enable row level security;

-- Admins only. The public signing page and its submit action run
-- server-side with the service role key, bypassing RLS deliberately -
-- there is no anonymous or authenticated policy on this table at all,
-- so the anon key can never read or list pending applicants.
create policy "admins manage nda_requests" on nda_requests
  for all using (is_admin());

-- Migration: file attachments on jobs (briefs, reference photos, drawings).
create table if not exists job_files (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs (id) on delete cascade,
  file_path text not null,
  file_name text not null,
  size_bytes bigint,
  uploaded_by uuid references admin_users (id),
  created_at timestamptz not null default now()
);

alter table job_files enable row level security;

create policy "contractors can view job files" on job_files
  for select using (auth.uid() is not null);
create policy "admins manage job files" on job_files
  for all using (is_admin());

-- Storage bucket for the actual file bytes. Private - access goes
-- through the policies below, not a public URL.
insert into storage.buckets (id, name, public)
values ('job-files', 'job-files', false)
on conflict (id) do nothing;

create policy "admins manage job-files storage" on storage.objects
  for all using (bucket_id = 'job-files' and is_admin());
create policy "contractors can read job-files storage" on storage.objects
  for select using (bucket_id = 'job-files' and auth.uid() is not null);
