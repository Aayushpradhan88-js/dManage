ALTER TABLE "institute_applications"
ADD COLUMN "rejection_reason" TEXT,
ADD COLUMN "approved_institute_id" UUID;

ALTER TABLE "institute_applications"
ADD CONSTRAINT "institute_applications_approved_institute_id_fkey"
FOREIGN KEY ("approved_institute_id") REFERENCES "institutes"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
