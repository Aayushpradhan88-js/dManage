/*
  Warnings:

  - The values [institute] on the enum `announcement_scope` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `institute_id` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `institute_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `institute_role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `system_role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `institute_applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `institute_memberships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `institutes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform_id` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_id` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "dmanage_role" AS ENUM ('super_admin', 'admin', 'teacher', 'student');

-- CreateEnum
CREATE TYPE "platform_type" AS ENUM ('School', 'College', 'University', 'Institute', 'CoachingCenter', 'OnlineCoachingInstitute');

-- CreateEnum
CREATE TYPE "course_level" AS ENUM ('beginner', 'intermediate', 'advanced');

-- AlterEnum
BEGIN;
CREATE TYPE "announcement_scope_new" AS ENUM ('platform', 'course');
ALTER TABLE "announcements" ALTER COLUMN "scope" DROP DEFAULT;
ALTER TABLE "announcements" ALTER COLUMN "scope" TYPE "announcement_scope_new" USING ("scope"::text::"announcement_scope_new");
ALTER TYPE "announcement_scope" RENAME TO "announcement_scope_old";
ALTER TYPE "announcement_scope_new" RENAME TO "announcement_scope";
DROP TYPE "announcement_scope_old";
ALTER TABLE "announcements" ALTER COLUMN "scope" SET DEFAULT 'platform';
COMMIT;

-- AlterEnum
ALTER TYPE "course_status" ADD VALUE 'deleted';

-- DropForeignKey
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "course_teachers" DROP CONSTRAINT "course_teachers_membership_id_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "institute_applications" DROP CONSTRAINT "institute_applications_approved_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "institute_applications" DROP CONSTRAINT "institute_applications_reviewed_by_fkey";

-- DropForeignKey
ALTER TABLE "institute_applications" DROP CONSTRAINT "institute_applications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "institute_memberships" DROP CONSTRAINT "institute_memberships_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "institute_memberships" DROP CONSTRAINT "institute_memberships_user_id_fkey";

-- DropForeignKey
ALTER TABLE "institutes" DROP CONSTRAINT "institutes_created_by_fkey";

-- DropIndex
DROP INDEX "idx_announcement_institute";

-- DropIndex
DROP INDEX "idx_course_institute";

-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "institute_id",
ADD COLUMN     "platform_id" UUID NOT NULL,
ALTER COLUMN "scope" SET DEFAULT 'platform';

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "institute_id",
ADD COLUMN     "difficulty_level" "course_level" NOT NULL DEFAULT 'beginner',
ADD COLUMN     "is_free" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "platform_id" UUID NOT NULL,
ADD COLUMN     "preview_video_url" TEXT,
ADD COLUMN     "slug" VARCHAR(300) NOT NULL,
ADD COLUMN     "total_duration_seconds" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "institute_role",
DROP COLUMN "system_role",
ADD COLUMN     "dmanage_role" "dmanage_role" NOT NULL DEFAULT 'student';

-- DropTable
DROP TABLE "institute_applications";

-- DropTable
DROP TABLE "institute_memberships";

-- DropTable
DROP TABLE "institutes";

-- DropEnum
DROP TYPE "institute_role";

-- DropEnum
DROP TYPE "system_role";

-- CreateTable
CREATE TABLE "platform" (
    "id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "logo_url" TEXT,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_application_form" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255),
    "pan_number" VARCHAR(20),
    "vat_number" VARCHAR(20),
    "dmanage_role" "dmanage_role" NOT NULL,
    "status" "application_status" NOT NULL DEFAULT 'pending',
    "rejection_reason" TEXT,
    "reviewed_by" UUID,
    "approved_platform_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_application_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_memberships" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "platform_id" UUID NOT NULL,
    "dmanage_role" "dmanage_role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "platform_slug_key" ON "platform"("slug");

-- CreateIndex
CREATE INDEX "idx_inst_app_user" ON "platform_application_form"("user_id");

-- CreateIndex
CREATE INDEX "idx_membership_platform" ON "platform_memberships"("platform_id");

-- CreateIndex
CREATE UNIQUE INDEX "platform_memberships_user_id_platform_id_key" ON "platform_memberships"("user_id", "platform_id");

-- CreateIndex
CREATE INDEX "idx_announcement_platform" ON "announcements"("platform_id");

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE INDEX "idx_course_platform" ON "courses"("platform_id");

-- AddForeignKey
ALTER TABLE "platform" ADD CONSTRAINT "platform_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_application_form" ADD CONSTRAINT "platform_application_form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_application_form" ADD CONSTRAINT "platform_application_form_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_application_form" ADD CONSTRAINT "platform_application_form_approved_platform_id_fkey" FOREIGN KEY ("approved_platform_id") REFERENCES "platform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_memberships" ADD CONSTRAINT "platform_memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_memberships" ADD CONSTRAINT "platform_memberships_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_teachers" ADD CONSTRAINT "course_teachers_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "platform_memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;
