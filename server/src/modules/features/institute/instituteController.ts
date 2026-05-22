import type { NextFunction, Response } from "express"
import { db } from "../../../db/connection.ts"
import type { IExtendedRequest } from "../../../global/types/types.ts"
import { validateInstituteApplicationPayload } from "./instituteValidation.ts"

class InstituteController {
    static async createInstitute(req: IExtendedRequest, res: Response, next: NextFunction) {
        const userId = req?.user?.id
        if (!userId) {
            return res.status(404).json({ message: "User not found!!" })
        }

        const validatedPayload = validateInstituteApplicationPayload(req.body)

        const existingPendingApplication = await db.instituteApplication.findFirst({
            where: {
                userId,
                status: "pending",
            },
        })

        if (existingPendingApplication) {
            return res.status(409).json({
                message: "You already have a pending institute application.",
            })
        }

        // We intentionally create a pending application instead of a live
        // institute so the super admin can verify submitted PAN/VAT details
        // against official government records before granting admin access.
        // const newApplication = await db.instituteApplication.create({
        //     data: {
        //         userId,
        //         // message: JSON.stringify({
        //         //     instituteName: validatedPayload.instituteName,
        //         //     instituteEmail: validatedPayload.instituteEmail,
        //         //     institutePhoneCountry: validatedPayload.institutePhoneCountry,
        //         //     institutePhoneNumber: validatedPayload.institutePhoneNumber,
        //         //     instituteAddress: validatedPayload.instituteAddress,
        //         //     instituteVatNumber: validatedPayload.instituteVatNumber,
        //         //     institutePanNumber: validatedPayload.institutePanNumber,
        //         //     governmentVerificationStatus: "pending_manual_review",
        //         // }),
        //     }
        // })

        const newApplication = await db.instituteApplication.create({
            data: {
                userId,
                name: validatedPayload.instituteName,
                email: validatedPayload.instituteEmail,
                phone: validatedPayload.institutePhoneNumber,
                address: validatedPayload.instituteAddress,
                vatNumber: validatedPayload.instituteVatNumber,
                panNumber: validatedPayload.institutePanNumber,
                status: "pending",
            }
        })

        return res.status(200).json({
            newApplication,
            message: "Institute application submitted successfully, It will take some time to get verified"
        })
    }

    static async getMyInstituteApplication(req: IExtendedRequest, res: Response) {
        const userId = req?.user?.id

        if (!userId) {
            return res.status(404).json({ message: "User not found!!" })
        }

        const application = await db.instituteApplication.findFirst({
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
            data: application,
            message: application
                ? "Institute application fetched successfully"
                : "No institute application found for this user",
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
        return res.status(200).json({ message: "institute resources generated successfully" })
    }

    static async createCategoryTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next()
    }
}

export default InstituteController
