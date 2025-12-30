import { Response } from "express";
import IExtendedRequest from "../../global/types/types";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface ITeacherPassword{
    teacherPassword: string
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

        const isPasswordMatched =  bcrypt.compare(teacherPassword, teacherData[0].teacherPassword);
        if(!isPasswordMatched){
            return res.status(403).json({
                success: false,
                message: 'Invalid Credientals'
            });
        };

        const token = jwt.sign("")

    }
}

export default TeacherController;