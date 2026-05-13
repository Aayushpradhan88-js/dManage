import { NextFunction, Response } from "express";
import { db } from "../../../db/connection";
import { IExtendedRequest } from "../../global/types/types";
import { validateInstituteApplicationPayload } from "./instituteValidation.ts";

class InstituteController {
    static async createInstitute(req: IExtendedRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(404).json({ message: "User not found!!" });
            }

            const validatedPayload = validateInstituteApplicationPayload(req.body);

            const existingPendingApplication = await db.instituteApplication.findFirst({
                where: {
                    userId,
                    status: "pending",
                },
            });

            if (existingPendingApplication) {
                return res.status(409).json({
                    message: "You already have a pending institute application.",
                });
            }

            // We intentionally create a pending application instead of a live
            // institute so the super admin can verify submitted PAN/VAT details
            // against official government records before granting admin access.
            const newApplication = await db.instituteApplication.create({
                data: {
                    userId,
                    instituteName: validatedPayload.instituteName,
                    message: JSON.stringify({
                        instituteEmail: validatedPayload.instituteEmail,
                        institutePhoneCountry: validatedPayload.institutePhoneCountry,
                        institutePhoneNumber: validatedPayload.institutePhoneNumber,
                        instituteAddress: validatedPayload.instituteAddress,
                        instituteVatNumber: validatedPayload.instituteVatNumber,
                        institutePanNumber: validatedPayload.institutePanNumber,
                        governmentVerificationStatus: "pending_manual_review",
                    }),
                }
            });

            return res.status(200).json({
                message: "Institute application submitted successfully",
                data: newApplication
            });
        } catch (error) {
            next(error);
        };
    };

    static async createTeacherTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next();
    };

    static async createStudentTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next();
    };

    static async createCourseTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next();
    };

    static async createCourseChapterTable(req: IExtendedRequest, res: Response) {
        return res.status(200).json({ message: "institute resources generated successfully" });
    };

    static async createCategoryTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        next();
    };
};

export default InstituteController;
