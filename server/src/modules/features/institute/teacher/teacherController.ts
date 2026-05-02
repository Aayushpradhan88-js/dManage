import { Response } from "express";
import { IExtendedRequest } from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { QueryTypes, Sequelize } from "sequelize";
import generateRandomPasswordService from "../../../global/services/generateRandomPassword";
import MailService from "../../../global/services/nodeMailer";

class TeacherController {
    //create teacher
    static async createTeacher(req: { IExtendedRequest }, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber?.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        }

        const { teacherName, teacherEmail, teacherPhoneNumber, teacherExperience, joinedDate, salary } = req.body;

        if (!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExperience || !joinedDate || !salary) {
            return res.status(400).json({ errorMessage: "fill all the fields" });
        }

        const passwordData = await generateRandomPasswordService.genereateHashPassword(teacherName);
        if (!passwordData) {
            return res.status(500).json({ errorMessage: "password hashing failed" });
        }

        const teacherPhoto: string = req.file ? req.file.path : "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg";

        // ✅ Fixed: Removed trailing comma after teacherPhoto
        await sequelize.query(`
        INSERT INTO teacher_${currentInstituteNumber}(
            teacherName,
            teacherEmail,
            teacherPassword,
            teacherPhoneNumber,
            teacherExperience,
            joinedDate,
            salary,
            teacherPhoto
        ) VALUES(?,?,?,?,?,?,?,?)
    `, {
            type: QueryTypes.INSERT,
            replacements: [
                teacherName,
                teacherEmail,
                passwordData.hashPassword,
                teacherPhoneNumber,
                teacherExperience,
                joinedDate,
                salary,
                teacherPhoto
            ]
        });

        const teacherData: { id: string }[] = await sequelize.query(`
        SELECT id FROM teacher_${currentInstituteNumber} WHERE teacherEmail=?
    `, {
            type: QueryTypes.SELECT,
            replacements: [teacherEmail]
        });

        const teacherId = teacherData[0]?.id;
        if (!teacherId) {
            return res.status(500).json({ errorMessage: "failed to get teacher id" });
        }

        const mailInformation = {
            to: teacherEmail,
            subject: "Welcome to Software Development teacher",
            text: `Here is your email: ${teacherEmail} password: ${passwordData.plainPassword} & instituteNumber: ${currentInstituteNumber}`
        };

        try {
            await MailService.sendMail(mailInformation);
            return res.status(200).json({
                success: true,
                data: {
                    teacherId,
                    instituteNumber: currentInstituteNumber,
                    name: teacherName,
                    email: teacherEmail
                },
                message: `Teacher created successfully`
            });
        } catch (error) {
            console.error("Email failed:", error);
            return res.status(500).json({
                success: false,
                message: "Teacher created but email failed"
            });
        };
    };

    //get all teacher
    static async getAllTeacher(req: { IExtendedRequest }, res: Response) {
        const currentInstituteNumber = req?.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber?.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const getAllTeacher = await sequelize.query(`
            SELECT * FROM teacher_${currentInstituteNumber}
            ORDER BY createdAt DESC
            `,
            {
                type: QueryTypes.SELECT
            }
        );
        if (!getAllTeacher) {
            return res.status(400).json({ errorMessage: "failed to fetch data" });
        };

        return res.status(200).json({
            success: true,
            datas: getAllTeacher,
            message: `Institute ${currentInstituteNumber} Teachers data fetched successfully`
        });
    }

    //get single teacher
    static async getSingleTeacher(req: { IExtendedRequest }, res: Response) {
        const currentInstituteNumber = req?.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber?.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const teacherId = req.params.id;
        if (!teacherId) {
            return res.status(400).json({
                message: 'invalid category Id'
            });
        };

        const singleTeacher = await sequelize.query(`
                SELECT * From teacher_${currentInstituteNumber} WHERE id=?
            `,
            {
                replacements: [teacherId],
                type: QueryTypes.SELECT
            }
        );
        if (!singleTeacher) {
            return res.status(404).json({ errorMessage: "Teacher not found" });
        };

        return res.status(200).json({
            success: true,
            data: singleTeacher,
            message: `single teacher fetched successfully of institute ${currentInstituteNumber}`
        });
    };

    //delete single teacher
    static async deleteSingleteacher(req: { IExtendedRequest }, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        const teacherId = req.params.id;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const deletedteacher = await sequelize.query(`
            DELETE FROM teacher_${currentInstituteNumber} 
            WHERE id=?`
            , {
                replacements: [teacherId],
                type: QueryTypes.DELETE,
            });
        return res.status(200).json({
            success: true,
            data: deletedteacher,
            message: `teacher deleted successfully from institute ${currentInstituteNumber} `
        });
    };

    //update teacher
    // static async updateSingleCategory(req: {IExtendedRequest}, res: Response) {
    //     const currentInstituteNumber = req?.user?.currentInstituteNumber;
    //     if (!currentInstituteNumber || currentInstituteNumber?.trim().length === 0) {
    //         return res.status(400).json({ errorMessage: "Invalid institute number" });
    //     };

    //     const teacherId = req.params.id;
    //     if (!teacherId) {
    //         return res.status(400).json({
    //             message: 'invalid teacher Id'
    //         });
    //     };

    //     const { teacherName, teacherEmail, teacherPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, teacherId } = req.body;

    //     if (!teacherPassword) {
    //         return res.status(402).json({
    //             message: 'invalid teacher password'
    //         });
    //     };

    //     const updatePasswordData = generateRandomPasswordService.genereateHashPassword(teacherName);

    //     const [results] = await sequelize.query(`
    //                 UPDATE teacher_${currentInstituteNumber}
    //                 SET teacherName = ?, teacherEmail = ?, teacherPassword = ?, teacherPhoneNumber = ?, teacherExperience = ?, joinedDate = ?, salary = ?, teacherId = ?, updatedAt=NOW()
    //                 WHERE id=?
    //             `,
    //         {
    //             replacements: [teacherName, teacherEmail, (await updatePasswordData).hashPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, teacherId, teacherId],
    //             type: QueryTypes.UPDATE
    //         }
    //     );

    //     if (!results)
    //     };
};

export default TeacherController;