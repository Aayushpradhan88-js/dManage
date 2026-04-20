import { NextFunction, Response } from "express";
import { db } from "../../../db/connection";
import IExtendedRequest from "../../global/types/types";

class InstituteController {
    static async createInstitute(req: IExtendedRequest, res: Response, next: NextFunction) {
        const {
            instituteName,
            instituteEmail,
            institutePhoneNumber,
            instituteAddress,
            instituteVatNumber = null,
            institutePanNumber = null
        } = req.body;

        if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
            return res.status(400).json({
                message: "Provide all the required fields!!"
            });
        };

        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(404).json({ message: "User not found!!" });
            }

            // In our new schema, Institute has name, and slug. Since we are migrating from dynamic tables to a unified table:
            const newInstitute = await db.institute.create({
                data: {
                    name: instituteName,
                    slug: instituteName.toLowerCase().replace(/ /g, '-'),
                    // We can add logic to keep extra dynamic fields if schema updates, but for now we fallback to description
                    description: `Address: ${instituteAddress}, Phone: ${institutePhoneNumber}, Email: ${instituteEmail}, VAT: ${instituteVatNumber}, PAN: ${institutePanNumber}`,
                    createdBy: userId
                }
            });

            // Create membership record for the creator
            await db.instituteMembership.create({
                data: {
                    userId,
                    instituteId: newInstitute.id,
                    role: "admin",
                    isActive: true
                }
            });

            // Update user to have current roles or system fields if needed
            // NOTE: user schema replaced currentInstituteNumber with robust relations, you might store it in a session or client.

            return res.status(200).json({
                message: "successfully created institute",
                data: newInstitute
            });
        } catch (error) {
            console.error("✗ Server Error: Failed to create institute:", (error as Error).stack);
            return res.status(500).json({
                errorMessage: (error as Error).message,
                fullErrorMessage: error
            });
        };
    };

    static async createTeacherTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        // Table creation handled by Prisma push/migrate, so nothing dynamic happens here anymore
        next();
    };

    static async createStudentTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        // Table creation handled by Prisma push/migrate, so nothing dynamic happens here anymore
        next();
    };

    static async createCourseTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        // Table creation handled by Prisma push/migrate, so nothing dynamic happens here anymore
        next();
    };

    static async createCourseChapterTable(req: IExtendedRequest, res: Response) {
        // Table creation handled by Prisma push/migrate, so nothing dynamic happens here anymore
        return res.status(200).json({ message: "institute resources generated successfully" });
    };

    static async createCategoryTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        // Table creation handled by Prisma push/migrate, so nothing dynamic happens here anymore
        next();
    };
};

export default InstituteController;