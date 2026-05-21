import type { Response } from "express"
import { ApplicationStatus, InstituteRole, SystemRole } from "@prisma/client"
import { db } from "../../../db/connection.ts"
import type { IExtendedRequest } from "../../../global/types/types.ts"
import { APIError } from "../../../config/api-error-response.ts"
import MailService from "../../../global/services/nodeMailer.ts"

function slugifyInstituteName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180)
}

async function ensureSuperAdmin(userId?: string) {
  if (!userId) {
    throw new APIError("Unauthorized", 401)
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, systemRole: true },
  })

  if (!user || user.systemRole !== SystemRole.super_admin) {
    throw new APIError("Only super admins can perform this action", 403)
  }

  return user
}

class SuperAdminController {
  static async getInstituteApplications(req: IExtendedRequest, res: Response) {
    await ensureSuperAdmin(req.user?.id)

    const applications = await db.instituteApplication.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        approvedInstitute: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return res.status(200).json({
      message: "Institute applications fetched successfully",
      data: applications,
    })
  }

  static async updateInstituteApplicationStatus(req: IExtendedRequest, res: Response) {
    const reviewer = await ensureSuperAdmin(req.user?.id)
    const applicationId = req.params.id
    const requestedStatus = String(req.body?.status ?? "").trim().toLowerCase()
    const rejectionReason = String(req.body?.rejectionReason ?? "").trim()

    if (!applicationId) {
      throw new APIError("Application id is required", 400)
    }

    if (requestedStatus !== ApplicationStatus.approved && requestedStatus !== ApplicationStatus.rejected) {
      throw new APIError("Status must be either approved or rejected", 400)
    }

    if (requestedStatus === ApplicationStatus.rejected && !rejectionReason) {
      throw new APIError("Rejection reason is required", 400)
    }

    const application = await db.instituteApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    })

    if (!application) {
      throw new APIError("Institute application not found", 404)
    }

    if (application.status !== ApplicationStatus.pending) {
      throw new APIError("Only pending applications can be reviewed", 409)
    }

    if (requestedStatus === ApplicationStatus.rejected) {
      const rejectedApplication = await db.instituteApplication.update({
        where: { id: applicationId },
        data: {
          status: ApplicationStatus.rejected,
          rejectionReason,
          reviewedBy: reviewer.id,
        },
      })

      await MailService.sendMail({
        to: application.user.email,
        subject: "Your institute application was rejected",
        text: `Hello ${application.user.username}, your institute application for ${application.name} was rejected. Reason: ${rejectionReason}`,
      })

      return res.status(200).json({
        message: "Institute application rejected successfully",
        data: rejectedApplication,
      })
    }

    const baseSlug = slugifyInstituteName(application.name) || `institute-${application.id.slice(0, 8)}`

    const approvalResult = await db.$transaction(async (tx) => {
      let nextSlug = baseSlug
      let suffix = 1

      while (await tx.institute.findUnique({ where: { slug: nextSlug } })) {
        nextSlug = `${baseSlug}-${suffix}`
        suffix += 1
      }

      const institute = await tx.institute.create({
        data: {
          name: application.name,
          slug: nextSlug,
          createdBy: application.userId,
        },
      })

      await tx.instituteMembership.upsert({
        where: {
          userId_instituteId: {
            userId: application.userId,
            instituteId: institute.id,
          },
        },
        update: {
          role: InstituteRole.admin,
          isActive: true,
        },
        create: {
          userId: application.userId,
          instituteId: institute.id,
          role: InstituteRole.admin,
          isActive: true,
        },
      })

      const updatedApplication = await tx.instituteApplication.update({
        where: { id: applicationId },
        data: {
          status: ApplicationStatus.approved,
          rejectionReason: null,
          reviewedBy: reviewer.id,
          approvedInstituteId: institute.id,
        },
      })

      return { institute, updatedApplication }
    })

    await MailService.sendMail({
      to: application.user.email,
      subject: "Your institute is registered successfully",
      text: `Hello ${application.user.username}, your institute ${application.name} has been approved. Please log in to DManage and continue your journey from the institute admin dashboard.`,
    })

    return res.status(200).json({
      message: "Institute application approved successfully",
      data: approvalResult.updatedApplication,
      institute: approvalResult.institute,
    })
  }
}

export default SuperAdminController
