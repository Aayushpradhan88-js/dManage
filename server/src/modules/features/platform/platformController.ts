import type { NextFunction, Response } from "express"
import { CourseStatus, PlatformApplicationFormStatus } from "@prisma/client"
import { db } from "../../../db/connection.ts"
import type { IExtendedRequest } from "../../../global/types/types.ts"
import { validatePlatformApplicationPayload } from "./platformValidation.ts"

class PlatformController {
    static async getPublicPlatforms(req: IExtendedRequest, res: Response) {
        const platforms = await db.platform.findMany({
            where: {
                approvedApplications: {
                    some: {
                        status: PlatformApplicationFormStatus.approved,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                logoUrl: true,
                createdAt: true,
                creator: {
                    select: {
                        username: true,
                    },
                },
                approvedApplications: {
                    where: {
                        status: PlatformApplicationFormStatus.approved,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                    select: {
                        email: true,
                        phone: true,
                        address: true,
                    },
                },
                _count: {
                    select: {
                        courses: {
                            where: {
                                status: CourseStatus.published,
                            },
                        },
                    },
                },
            },
        })

        const formattedPlatforms = platforms.map((platform) => ({
            id: platform.id,
            name: platform.name,
            slug: platform.slug,
            description: platform.description,
            logoUrl: platform.logoUrl,
            createdAt: platform.createdAt,
            ownerName: platform.creator.username,
            email: platform.approvedApplications[0]?.email ?? null,
            phone: platform.approvedApplications[0]?.phone ?? null,
            address: platform.approvedApplications[0]?.address ?? null,
            courseCount: platform._count.courses,
        }))

        return res.status(200).json({
            message: "Public platforms fetched successfully",
            data: formattedPlatforms,
        })
    }

    static async getPublicPlatformDetail(req: IExtendedRequest, res: Response) {
        const platformId = req.params.id

        if (!platformId) {
            return res.status(400).json({
                message: "Platform id is required",
            })
        }

        const platform = await db.platform.findFirst({
            where: {
                id: platformId,
                approvedApplications: {
                    some: {
                        status: PlatformApplicationFormStatus.approved,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                logoUrl: true,
                createdAt: true,
                creator: {
                    select: {
                        username: true,
                    },
                },
                approvedApplications: {
                    where: {
                        status: PlatformApplicationFormStatus.approved,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                    select: {
                        email: true,
                        phone: true,
                        address: true,
                    },
                },
                courses: {
                    where: {
                        status: CourseStatus.published,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        thumbnailUrl: true,
                        price: true,
                        status: true,
                        createdAt: true,
                    },
                },
            },
        })

        if (!platform) {
            return res.status(404).json({
                message: "Platform not found",
            })
        }

        return res.status(200).json({
            message: "Public platform fetched successfully",
            data: {
                id: platform.id,
                name: platform.name,
                slug: platform.slug,
                description: platform.description,
                logoUrl: platform.logoUrl,
                createdAt: platform.createdAt,
                ownerName: platform.creator.username,
                email: platform.approvedApplications[0]?.email ?? null,
                phone: platform.approvedApplications[0]?.phone ?? null,
                address: platform.approvedApplications[0]?.address ?? null,
                courses: platform.courses.map((course) => ({
                    ...course,
                    price: Number(course.price),
                })),
            },
        })
    }

    static async createPlatform(req: IExtendedRequest, res: Response, next: NextFunction) {
        const userId = req?.user?.id
        if (!userId) {
            return res.status(404).json({ message: "User not found!!" })
        }

        const validatedPayload = validatePlatformApplicationPayload(req.body)

        const existingPendingApplication = await db.platformApplicationsForm.findFirst({
            where: {
                userId,
                status: PlatformApplicationFormStatus.pending,
            },
        })

        if (existingPendingApplication) {
            return res.status(409).json({
                message: "You already have a pending platform application.",
            })
        }

        // We intentionally create a pending application instead of a live
        // platform so the super admin can verify submitted PAN/VAT details
        // against official government records before granting admin access.
        const newApplication = await db.platformApplicationsForm.create({
            data: {
                userId,
                name: validatedPayload.platformName,
                email: validatedPayload.platformEmail,
                phone: validatedPayload.platformPhoneNumber,
                address: validatedPayload.platformAddress,
                vatNumber: validatedPayload.platformVatNumber,
                panNumber: validatedPayload.platformPanNumber,
                role: "admin",
                status: PlatformApplicationFormStatus.pending,
            }
        })

        return res.status(200).json({
            newApplication,
            message: "Platform application submitted successfully. It will take some time to get verified."
        })
    }

    static async getMyPlatformApplication(req: IExtendedRequest, res: Response) {
        const userId = req?.user?.id

        if (!userId) {
            return res.status(404).json({ message: "User not found!!" })
        }

        const application = await db.platformApplicationsForm.findFirst({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
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
            data: application,
            message: application
                ? "Platform application fetched successfully"
                : "No platform application found for this user",
        })
    }

    static async createTeacherTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next()
    }

    static async createStudentTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next()
    }

    static async createCourseTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next()
    }

    static async createCourseChapterTable(req: IExtendedRequest, res: Response) {
        return res.status(200).json({ message: "platform resources generated successfully" })
    }

    static async createCategoryTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next()
    }
}

export default PlatformController
