-- dManage v1 shared database schema
-- Target: PostgreSQL
-- Strategy: single shared database, tenant keyed tables, institute RBAC via memberships

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'system_role') then
    create type system_role as enum ('user', 'super_admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'membership_role') then
    create type membership_role as enum ('admin', 'teacher', 'student');
  end if;

  if not exists (select 1 from pg_type where typname = 'application_status') then
    create type application_status as enum ('pending', 'approved', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'membership_status') then
    create type membership_status as enum ('active', 'blocked', 'removed');
  end if;

  if not exists (select 1 from pg_type where typname = 'course_status') then
    create type course_status as enum ('draft', 'published', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'enrollment_status') then
    create type enrollment_status as enum ('pending', 'active', 'cancelled', 'completed');
  end if;

  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type order_status as enum ('pending', 'paid', 'failed', 'refunded');
  end if;

  if not exists (select 1 from pg_type where typname = 'announcement_scope') then
    create type announcement_scope as enum ('all_members', 'all_students', 'all_teachers', 'course');
  end if;
end $$;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  full_name varchar(120) not null,
  email varchar(190) not null unique,
  password_hash text not null,
  system_role system_role not null default 'user',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists institutes (
  id uuid primary key default gen_random_uuid(),
  name varchar(180) not null,
  slug varchar(120) not null unique,
  contact_email varchar(190),
  contact_phone varchar(40),
  description text,
  logo_url text,
  is_active boolean not null default true,
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists institute_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_user_id uuid not null references users(id),
  institute_name varchar(180) not null,
  institute_slug varchar(120) not null,
  contact_email varchar(190),
  contact_phone varchar(40),
  message text,
  status application_status not null default 'pending',
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  approved_institute_id uuid references institutes(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists institute_applications_slug_key
  on institute_applications (institute_slug);

create table if not exists institute_memberships (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role membership_role not null,
  status membership_status not null default 'active',
  blocked_reason text,
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (institute_id, user_id, role)
);

create index if not exists institute_memberships_user_idx
  on institute_memberships (user_id);

create index if not exists institute_memberships_institute_idx
  on institute_memberships (institute_id);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  title varchar(180) not null,
  slug varchar(160) not null,
  description text,
  thumbnail_url text,
  price numeric(10,2) not null default 0,
  status course_status not null default 'draft',
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (institute_id, slug)
);

create index if not exists courses_institute_idx
  on courses (institute_id);

create table if not exists course_teachers (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  membership_id uuid not null references institute_memberships(id) on delete cascade,
  assigned_by uuid not null references users(id),
  assigned_at timestamptz not null default now(),
  unique (course_id, membership_id)
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  user_id uuid not null references users(id),
  course_id uuid not null references courses(id),
  amount numeric(10,2) not null,
  currency varchar(10) not null default 'NPR',
  gateway varchar(40) not null,
  gateway_order_ref varchar(120),
  status order_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists course_enrollments (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  membership_id uuid references institute_memberships(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  status enrollment_status not null default 'active',
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (course_id, user_id)
);

create index if not exists course_enrollments_user_idx
  on course_enrollments (user_id);

create table if not exists course_chapters (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  title varchar(180) not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists course_lessons (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  chapter_id uuid not null references course_chapters(id) on delete cascade,
  title varchar(180) not null,
  lesson_type varchar(40) not null default 'video',
  content text,
  video_url text,
  material_url text,
  sort_order integer not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists live_classes (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  lesson_id uuid references course_lessons(id) on delete set null,
  host_membership_id uuid not null references institute_memberships(id),
  title varchar(180) not null,
  meeting_url text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  created_by uuid not null references users(id),
  title varchar(180) not null,
  body text not null,
  scope announcement_scope not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists announcement_targets (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid not null references announcements(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  membership_role membership_role,
  check (
    course_id is not null or membership_role is not null
  )
);

create table if not exists lesson_progress (
  id uuid primary key default gen_random_uuid(),
  institute_id uuid not null references institutes(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  lesson_id uuid not null references course_lessons(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  is_completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lesson_id, user_id)
);

-- Minimal seed plan:
-- 1. create one super_admin user in users
-- 2. create institute via approval flow
-- 3. add institute_memberships rows for admin/teacher/student
