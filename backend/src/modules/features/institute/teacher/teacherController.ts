import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPasswordService from "../../../global/services/generateRandomPassword";
import MailService from "../../../global/services/nodeMailer";

class TeacherController {
    static async createTeacher(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber?.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const { teacherName, teacherEmail, teacherPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, courseId } = req.body;
        if (!teacherName || !teacherEmail || !teacherPassword || !teacherPhoneNumber || !teacherExperience || !joinedDate || !salary || !courseId) {
            return res.status(400).json({ errorMessage: "fill all the fields" });
        };

        const passwordData = generateRandomPasswordService.genereateHashPassword(teacherName);
        if (!passwordData) {
            return res.status(500).json({ errorMessage: "password hashing failed" });
        };

        const teacherPhoto: string = req.file ? req.file.path : "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740&q=80"

        //inserting teacher data with course_id
        const data = await sequelize.query(`
            INSERT INTO  teacher_${currentInstituteNumber}(
                teacherName,
                teacherEmail,
                teacherPassword,
                teacherPhoneNumber,
                teacherExperience,
                joinedDate,
                salary,
                teacherPhoto,
                course_id
            ) VALUES(?,?,?,?,?,?,?,?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [
                teacherName, teacherEmail, (await passwordData).hashPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, teacherPhoto, courseId
            ]
        });

        //query teacher_id from db
        const teacherData: { id: string }[] = await sequelize.query(`
                SELECT id FROM teacher_${currentInstituteNumber} WHERE teacherEmail=?
            `, {
            type: QueryTypes.SELECT,
            replacements: [teacherEmail]
        });

        console.log(teacherData, "data");

        const teacherId = teacherData[0]?.id;
        if (!teacherId) {
            return res.status(500).json({ errorMessage: "failed to get teacher id" });
        }

        //update course_id with teacher_id
        await sequelize.query(`
                UPDATE course_${currentInstituteNumber} SET teacher_id=? WHERE id=?`,
            {
                type: QueryTypes.UPDATE,
                replacements: [teacherId, courseId]
            }
        );

        console.log("✅teacher email triggered")
        const mailInformation = {
            to: teacherEmail,
            subject: "Welcome to Software Development Course",
            text: `Here is you're email: ${teacherEmail} & password: ${(await passwordData).plainPassword}`
        };

        console.log("✅nodemailer module triggered")
        try {
            await MailService.sendMail(mailInformation);
            return res.status(200).json({
                datas: data,
                success: true,
                message: "teacher created successfully"
            });
        } catch (error) {
            console.error("Email failed:", error);
            return res.status(200).json({
                datas: data,
                success: true,
                message: "teacher created but email failed"
            });
        }
        return res.status(200).json({
            datas: data,
            success: true,
            message: "teacher created successfully"
        });
    };
};

export default TeacherController;