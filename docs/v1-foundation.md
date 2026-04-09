# dManage V1 Foundation

## 1. V1 Product Position

dManage v1 should be optimized for shipping confidence, not perfect architecture.

That means:

- one shared database
- one backend API
- one auth system
- one main web app for all roles
- tenant-aware RBAC through membership records

Do not build separate backends or separate databases for `student`, `teacher`, and `admin` in v1.

## 2. Best First-Step at User Level

Start with the smallest full journey that proves the business:

1. Visitor signs up and becomes a `user`
2. Super-admin creates or approves an institute
3. Admin logs in to that institute
4. Admin creates one course
5. Admin assigns one teacher to that course
6. Student buys or enrolls in that course
7. Student opens course lessons

If this flow works end-to-end, your confidence will grow fast because it proves:

- authentication
- tenant isolation
- role-based routing
- course ownership
- teacher assignment
- student enrollment

Everything else in v1 should be built around this flow.

## 3. Domain Strategy for V1

Your current idea is:

- `dmanage.com`
- `student.dmanage.com`
- `teacher.dmanage.com`
- `admin.dmanage.com`

This is possible, but for v1 it adds avoidable complexity.

### Recommended v1 approach

Use:

- `dmanage.com` for marketing
- `app.dmanage.com` for the actual product

Inside `app.dmanage.com`, use route-based dashboards:

- `/student`
- `/teacher`
- `/admin`
- `/super-admin`

### Why this is better for v1

- only one Next.js app to maintain
- only one login flow
- shared UI components and shared state
- easier role switching for users who belong to multiple institutes
- less deployment and cookie/session complexity

### If you still want subdomains

Use subdomains only as URL aliases later, not as separate codebases.

Example:

- `student.dmanage.com` -> same Next app -> internally renders student routes
- `teacher.dmanage.com` -> same Next app
- `admin.dmanage.com` -> same Next app

The important rule is: one codebase, not three frontend products.

## 4. Core Role Model

Do not store the real business role only in `users.role`.

That breaks your product rules because one person can be:

- student in institute X
- teacher in institute Y
- admin in institute Z

### Recommended role split

Use two role layers:

1. `system_role`
   - `user`
   - `super_admin`

2. `membership_role` per institute
   - `admin`
   - `teacher`
   - `student`

This means:

- `users` stores the person
- `institute_memberships` stores the role inside an institute

That is the cleanest v1 model.

## 5. Recommended V1 Database Design

### Design principles

- single shared PostgreSQL database
- every tenant-owned table includes `institute_id`
- all access is filtered by `institute_id`
- user identity is global
- institute role is local to a tenant

### Minimum v1 tables

1. `users`
   - global identity for any person

2. `institutes`
   - one tenant = one institute/school/college

3. `institute_applications`
   - when a user applies to become an institute admin

4. `institute_memberships`
   - connects users to institutes with `admin`, `teacher`, `student`

5. `courses`
   - institute-owned course

6. `course_teachers`
   - many teachers can teach one course

7. `course_enrollments`
   - student joined or purchased a course

8. `course_chapters`
   - course structure

9. `course_lessons`
   - lesson content

10. `live_classes`
   - scheduled live sessions

11. `announcements`
   - notices, letters, quick messages

12. `announcement_targets`
   - target by membership, role, or course

13. `lesson_progress`
   - student progress tracking

14. `orders`
   - payment record

15. `blocked_memberships`
   - optional if you want a full history of block/unblock actions

### Most important modeling decision

`student`, `teacher`, and `admin` are not user types. They are institute memberships.

## 6. Role Conversion Flow

Instead of changing the person into a new permanent global role, think in events:

### A normal visitor

- not logged in

### A user after signup

- row created in `users`
- `system_role = user`

### A student after buying a course

- row created in `course_enrollments`
- if needed, create `institute_memberships(role = student)`

### An admin after institute approval

- row created in `institute_applications`
- super-admin approves application
- row created in `institutes`
- row created in `institute_memberships(role = admin)`

### A teacher after assignment

- if teacher already has account, create membership with `role = teacher`
- then assign teacher to a course via `course_teachers`

This avoids destructive role overwrites.

## 7. Recommended Backend Folder Structure

Keep one backend.

```text
backend/
  src/
    app.ts
    server.ts
    config/
    database/
      migrations/
      schema/
      seed/
    modules/
      auth/
      users/
      institutes/
      memberships/
      courses/
      enrollments/
      announcements/
      live-classes/
      progress/
      payments/
      super-admin/
    middleware/
      auth.ts
      requireSystemRole.ts
      requireInstituteRole.ts
      resolveInstituteContext.ts
    shared/
      types/
      utils/
      constants/
      errors/
```

### Important backend rule

Feature modules should be business-based, not dashboard-based.

Good:

- `courses`
- `memberships`
- `announcements`

Avoid:

- `student-dashboard`
- `admin-dashboard`
- `teacher-dashboard`

Dashboards are frontend concepts. Backend should serve business entities.

## 8. Recommended Frontend Folder Structure

For v1, use one app instead of three separate clients.

```text
apps/
  web/
    src/
      app/
        (public)/
        (auth)/
        student/
        teacher/
        admin/
        super-admin/
      components/
      features/
        auth/
        institute/
        course/
        enrollment/
        announcement/
      lib/
        api/
        auth/
        guards/
        types/
        utils/
      store/
```

### Routing idea

- `/(public)` -> landing page and institute public pages
- `/auth/*` -> login/register
- `/student/*` -> student dashboard
- `/teacher/*` -> teacher dashboard
- `/admin/*` -> institute admin dashboard
- `/super-admin/*` -> platform dashboard

### Auth guard idea

After login:

- fetch current memberships
- select active institute if user belongs to more than one
- redirect by active role and institute context

## 9. Tenant Access Rules

Every protected request should validate:

1. user is authenticated
2. institute context exists if route is tenant-based
3. user has active membership in that institute
4. membership is not blocked
5. membership role is allowed for the action

### Examples

- admin of institute X cannot manage institute Y
- blocked teacher in institute X cannot enter X dashboard
- same teacher can still work in institute Y if not blocked there
- student can only view courses they are enrolled in

## 10. JWT / Session Recommendation

For v1, keep JWT simple.

### Token payload

- `sub` = user id
- `systemRole`

Do not permanently trust role from the token for institute actions.

For tenant routes, always load current membership from database using:

- `user_id`
- `institute_id`

This prevents stale authorization after block/unblock or role change.

## 11. V1 Scope You Should Actually Build

### Build now

- auth
- institute application approval
- institute membership management
- course CRUD
- teacher assignment
- student enrollment/purchase
- lesson/chapter CRUD
- announcements/notices
- simple student progress

### Do not overbuild now

- complex multi-subdomain architecture
- full LMS analytics
- deeply customizable dashboards
- advanced automation
- complicated event systems
- multi-tenant database-per-school

## 12. Current Repo Recommendation

Right now the repo has:

- one backend
- one institute client
- one student client
- one teacher client

For v1, do not continue expanding all three client apps in parallel.

Recommended direction:

1. keep one backend
2. choose one frontend app as the future main app
3. move all role dashboards into that single app
4. stop duplicating auth, layouts, and API clients across multiple clients

## 13. Immediate Build Order

### Phase 1

- finalize shared database schema
- implement `users`, `institutes`, `institute_memberships`
- seed super-admin
- build register/login

### Phase 2

- institute application flow
- super-admin approve/reject flow
- admin dashboard entry

### Phase 3

- course CRUD
- teacher assignment
- student enrollment

### Phase 4

- chapter/lesson CRUD
- notices and announcements
- progress tracking

## 14. The Most Important V1 Decision

If you want the cleanest and least painful version 1:

- one shared PostgreSQL database
- one backend API
- one frontend app
- one global user table
- one institute membership table for RBAC

That gives you a strong base for v2 and v3 without making v1 too complex.
