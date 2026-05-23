import type { Response } from "express"
import { DmanageRole, PlatformApplicationFormStatus } from "@prisma/client"
import { db } from "../../../db/connection.ts"
import type { IExtendedRequest } from "../../../global/types/types.ts"
import { APIError } from "../../../config/api-error-response.ts"
import MailService from "../../../global/services/nodeMailer.ts"

function slugifyPlatformName(name: string) {
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
    select: { id: true, role: true },
  })

  if (!user || user.role !== DmanageRole.super_admin) {
    throw new APIError("Only super admins can perform this action", 403)
  }

  return user
}

class SuperAdminController {
  static async getPlatformApplications(req: IExtendedRequest, res: Response) {
    await ensureSuperAdmin(req.user?.id)

    const applications = await db.platformApplicationsForm.findMany({
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
        approvedPlatform: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return res.status(200).json({
      message: "Platform applications fetched successfully",
      data: applications,
    })
  }

  static async updatePlatformApplicationStatus(req: IExtendedRequest, res: Response) {
    const reviewer = await ensureSuperAdmin(req.user?.id)
    const applicationId = req.params.id
    const requestedStatus = String(req.body?.status ?? "").trim().toLowerCase()
    const rejectionReason = String(req.body?.rejectionReason ?? "").trim()

    if (!applicationId) {
      throw new APIError("Application id is required", 400)
    }

    if (requestedStatus !== PlatformApplicationFormStatus.approved && requestedStatus !== PlatformApplicationFormStatus.rejected) {
      throw new APIError("Status must be either approved or rejected", 400)
    }

    if (requestedStatus === PlatformApplicationFormStatus.rejected && !rejectionReason) {
      throw new APIError("Rejection reason is required", 400)
    }

    const application = await db.platformApplicationsForm.findUnique({
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
      throw new APIError("Platform application not found", 404)
    }

    if (application.status !== PlatformApplicationFormStatus.pending) {
      throw new APIError("Only pending applications can be reviewed", 409)
    }

    if (requestedStatus === PlatformApplicationFormStatus.rejected) {
      const rejectedApplication = await db.platformApplicationsForm.update({
        where: { id: applicationId },
        data: {
          status: PlatformApplicationFormStatus.rejected,
          rejectionReason,
          reviewedBy: reviewer.id,
        },
      })

      await MailService.sendMail({
        to: application.user.email,
        subject: "Your platform application was rejected",
        text: `Hello ${application.user.username}, your platform application for ${application.name} was rejected. Reason: ${rejectionReason}`,
      })

      return res.status(200).json({
        message: "Platform application rejected successfully",
        data: rejectedApplication,
      })
    }

    const baseSlug = slugifyPlatformName(application.name) || `platform-${application.id.slice(0, 8)}`

    const approvalResult = await db.$transaction(async (tx) => {
      let nextSlug = baseSlug
      let suffix = 1

      while (await tx.platform.findUnique({ where: { slug: nextSlug } })) {
        nextSlug = `${baseSlug}-${suffix}`
        suffix += 1
      }

      const platform = await tx.platform.create({
        data: {
          name: application.name,
          slug: nextSlug,
          createdBy: application.userId,
        },
      })

      const existingMembership = await tx.platformMembership.findFirst({
        where: {
          userId: application.userId,
          platformId: platform.id,
        },
      })

      if (existingMembership) {
        await tx.platformMembership.update({
          where: {
            id: existingMembership.id,
          },
          data: {
            role: DmanageRole.admin,
            isActive: true,
          },
        })
      } else {
        await tx.platformMembership.create({
          data: {
            userId: application.userId,
            platformId: platform.id,
            role: DmanageRole.admin,
            isActive: true,
          },
        })
      }

      const updatedApplication = await tx.platformApplicationsForm.update({
        where: { id: applicationId },
        data: {
          status: PlatformApplicationFormStatus.approved,
          rejectionReason: null,
          reviewedBy: reviewer.id,
          approvedPlatformId: platform.id,
        },
      })

      return { platform, updatedApplication }
    })

    await MailService.sendMail({
      to: application.user.email,
      subject: "Your platform is registered successfully",
      text: `Hello ${application.user.username}, your platform ${application.name} has been approved. Please log in to DManage and continue your journey from the platform admin dashboard.`,
    })

    return res.status(200).json({
      message: "Platform application approved successfully",
      data: approvalResult.updatedApplication,
      platform: approvalResult.platform,
    })
  }
}

export default SuperAdminController
