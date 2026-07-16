-- Steady Hand Studios — contractor portal schema.
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

-- jobs: only logged-in contractors and admins can see jobs — never anonymous
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
