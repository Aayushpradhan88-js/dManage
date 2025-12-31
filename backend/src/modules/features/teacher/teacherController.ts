import { Response } from "express";
import IExtendedRequest from "../../global/types/types";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import TokenGenerationService from "../../global/services/generateToken";
import { JWT_EXPIRY, JWT_SECRET } from "../../../config/env";

interface ITeacherPassword {
    teacherPassword: string,
    id: string
}

class TeacherController {
    static async teacherLogin(req: IExtendedRequest, res: Response) {
        const { teacherInstituteNumber, teacherEmail, teacherPassword } = req.body;
        if (!teacherInstituteNumber || !teacherEmail || !teacherPassword) {
            return res.status(402).json({
                success: false,
                message: 'fill all the required fields'
            });
        };

        const teacherData: ITeacherPassword[] = await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail=?`,
            {
                type: QueryTypes.SELECT,
                replacements: [teacherEmail]
            }
        );
        console.log(teacherData, "teacherData");
        if (!teacherData || teacherData.length == 0) {
            return res.status(402).json({
                success: false,
                message: 'Invalid Credientals'
            });
        };

        const isPasswordMatched = bcrypt.compare(teacherPassword, teacherData[0]?.teacherPassword as string);
        if (!isPasswordMatched) {
            return res.status(403).json({
                success: false,
                message: 'Invalid Credientals'
            });
        };

        // const token = TokenGenerationService.generateToken( teacherData[0]?.id as string )
        const token = jwt.sign(teacherData[0]?.id as string, JWT_SECRET,{
            expiresIn: JWT_EXPIRY
        });

        return res.status(200).json({
            datas: token,
            message: "Teacher Logged in successfully"
        })

    }
}

export default TeacherController;