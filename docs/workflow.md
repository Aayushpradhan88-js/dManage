
                                              dManage Database design & v1 thinking model💭

In this dManage db design for very quick v1 we are focusing on single shared db approach, cleared tenant-keyed table, RBAC roles 

High Level Design (HLD)
In dManage there are 4 roles (each roles have it’s own responsibility & access control)



Super-Admin - It is a person who is on the top level who sees all thing it is like a god of dManage software.
Admin - Admin is a person who is the the principal of X institute but not the Y. That’s the difference
Teacher - Teacher is the role who is assigned to ‘X’ institute, admin will block the teacher or can remove it from his institute.
Student - Student is the role who will buy the course, basically It is independent role. Student can be admin or teacher but by the process only. But once a student buy the course of enrolled with X or Y institute he is now covered by that X institute. 

The flow of roles conversion
If some one come in website that is nothing, but if it logged in then he will be user
If logged in user buyes a course that will convert it into student because now he can access student dashboard
If user fill the form of institute then his role convert it into admin 
If admin will assign someone in course that will be teacher role
Super admin email, password, will be seeded in db so that it will access every tenant data easily

Database Entity Relationship Structure





V1 Thinking Model

Target Users - Edtech platforms
MVP Scope
Primary User Flow
Key features of v1 (but v2, v3 will be discussed in future & no recommendation also)
Functional Requirement
Targeted technical scope

Targeted Users
Institute, schools, universities, colleges (owners, principals). Student who want to lean things online. And owners, principals who want to manage their whole stuff teachers, courses, students, assignments, exams to conduct, take classes online. So these are the target users. 

MVP Scope
Authentication should be doned properly
Role based authentication per tenant  so that students will not redirect to the admin dashboard so on applies for all roles.
Institutes per tenant can launch their websites to sell courses. 
Core features on student, teacher, admin, superadmin dashboard to track everything
Per tenant Institute principal/admin can send immediate message/notice/report to the teachers & students or just only for all students for particular class or can send for all school teachers only 

Primary User Flow
I will provide you images 

Key features 
Authentication authorization (RBAC) per tenant
Dashboard for every roles to track things (superadmin, admin, teacher, student)
Super-Admin
It can reject X institute admin form with reason so that they can refill the form again or accept it 
Super admin can do anything what ever the admin, teacher, student do all things + additional power
Admin
 Can assign, remove instructor to a particular course/class
Block teacher & student with reason so that if they again try to enter at X institute then he will get a message popup why you’re not able to enter into i. But Y institute they can enter if they have permission or not blocked by admin 
Admin can Create, Read, Delete quick notice, meet, letter  to a particular class group students & for all teachers of X institute rather then sending to the different whatsapp group chat or messenger group chat
Admin can Create, Read, Update, Delete  new courses
Admin can schedule customize the dashboard according to it’s business need but teacher, student, can’t do it because that institute have buy the premium plan of our platform

Teacher
Teacher can Create, Read, Update, Delete - Chapters, lessons 
Teacher can do live class 
Teacher can do message X admin, complain admin for that particular student in email

Student
Student can buy multiple courses the buyed courses will be shown in that user dashboard
Student can see the courses chapters. 
Student can attend course live class + recorded class video also + study materials
Student per course progress will be tracked automatically

Targeted technical scope
Frontend - NextTS(app router), ReactTS, Redux-toolkit, Zod, ShadCN
Backend - NodeTS, ExpressTS(api creation), JWT, BCRYPT, Helmet, 
Database - PostgreSQL, Drizzle or sequelize, supabase(db storage), file/Image/video (supabase bucket)
Payment gateway - esewa/khalti/stripe/other option

In this product we have three main domains. But I doesn’t know how to show case the website 
For each role 

Like 
Main domain - dmanage.com
student.dmanage.com for student portal to access courses and get the complete dashboard of it
teacher.dmanage.com for teacher portal to get complete dashboard and teacher login stuff
admin.dmanage.com if institute logged in the platform then they will redirect to the admin.dmanage.com 
But I doesn’t know how should I do this flows tasks. Make sure we doesn’t have to make it complex at v1 level let’s code and build it 

How should we start at a user level first step. We have to complete for confidence building
Folderstructure division
Database design
Show more



34 previous messages
I’d start v1 much simpler than your current direction: one backend, one shared PostgreSQL database, and one Next app for all roles. The key change is your role model: student, teacher, and admin should not live as one permanent value on users; they should live in an institute membership table so one person can belong to different institutes with different roles. That’s the main gap in the current backend model at userModel.ts and it matters more than UI right now. Also, your backend is still wired for MySQL in connection.ts, so if Supabase/Postgres is the real target, this is the right moment to switch before the app grows.

I added a concrete v1 foundation doc at v1-foundation.md and a starter shared-schema SQL file at v1-shared-db.sql. The recommended first confidence-building flow is: signup -> super-admin approves institute -> admin enters institute -> admin creates course -> admin assigns teacher -> student enrolls -> student opens lessons. For domains, I strongly recommend dmanage.com for marketing and app.dmanage.com for the product, with /student, /teacher, /admin, and /super-admin routes inside the same app for v1.

The best immediate next implementation step is to replace the current single-role auth model with users + institutes + institute_memberships + institute_applications. After that, build institute approval and course assignment before touching multi-subdomain polish. No tests were needed here since I added architecture docs, not runtime code.

If you want, next I can start the actual backend refactor for that v1 schema and auth flow.


2 files changed
+667
-0
Undo
C:/Users/AAYUS/OneDrive/Desktop/Projects/dManage/docs/v1-foundation.md
C:/Users/AAYUS/OneDrive/Desktop/Projects/dManage/docs/v1-shared-db.sql
let's go with this approach - The important rule is: one codebase, not three frontend products.

no three seperate frontend folder for different roles. one folder internally renders student routes.

app.dmanage.com - how this thing works is it is a complete website for other roles what is the purpose of it


app.dmanage.com is not a separate role website. It is the single logged-in product.

Its purpose is simple:

dmanage.com = public website
This is for landing page, pricing, institute discovery, public course pages, and “apply as institute”.
app.dmanage.com = private app
This is where login happens and where student, teacher, admin, and super-admin dashboards live.
So all roles use the same app:

app.dmanage.com/login
app.dmanage.com/student
app.dmanage.com/teacher
app.dmanage.com/admin
app.dmanage.com/super-admin
Same Next.js codebase, different route groups.

A clean v1 user flow would be:

User visits dmanage.com
If they want to sign in, they go to app.dmanage.com/login
After login, backend returns:
who the user is
which institutes they belong to
what role they have in each institute
Frontend redirects them to the correct route:
student -> /student
teacher -> /teacher
admin -> /admin
super-admin -> /super-admin
Why keep app.dmanage.com at all?

it separates public marketing from private dashboards
it keeps auth and app logic in one place
it avoids building 3 frontend products
later, if needed, you can still map student.dmanage.com or admin.dmanage.com to the same app
If you want the simplest possible v1, we can even skip app.dmanage.com and do:

dmanage.com
dmanage.com/login
dmanage.com/student
dmanage.com/admin
That is even simpler technically.

My recommendation:
Use one frontend folder and one Next app with this structure:

src/app/
  (public)/
  (auth)/
  student/
  teacher/
  admin/
  super-admin/
If you want, next I can convert this decision into the exact final folder structure for your repo and the first auth + routing implementation order.


Now, first what we are going to do, first milestone to achieve

1. database v1 design 
2. making static pages of v1 to get the flow so that according to that we will write backend business controlleer
6:41 PM


Now, first what we are going to do, first milestone to achieve

1. database v1 design 
2. making static pages of v1 to get the flow so that according to that we will write backend business controlleer

tell me guide me and ask question before doing 
6:41 PM



First Milestone

We should do this in this order:

Freeze the v1 database design
Define the user flow screens from that schema
Build static pages with dummy data
After the flow feels right, write backend controllers