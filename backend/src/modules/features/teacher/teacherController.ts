import { Request, Response } from "express";
import IExtendedRequest from "../../global/types/types";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import TokenGenerationService from "../../global/services/generateToken";
import { JWT_EXPIRY, JWT_SECRET } from "../../../config/env";

interface ITeacherPassword {
    teacherPassword: string,
    id: string
}

class TeacherController {
    static async teacherLogin(req: Request, res: Response) {
        const { teacherInstituteNumber, teacherEmail, teacherPassword } = req.body;
        if (!teacherInstituteNumber || !teacherEmail || !teacherPassword) {
            return res.status(402).json({
                success: false,
                message: 'fill all the required fields'
            });
        };

        const teacherData: ITeacherPassword[] = await sequelize.query(`
            SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail=?`,
            {
                type: QueryTypes.SELECT,
                replacements: [teacherEmail]
            }
        );
        console.log(teacherData[0]?.teacherPassword, "teacherData");
        console.log(teacherData[0]?.id, "teacherData");
        // console.log(teacherData, "teacherData");
        if (!teacherData || teacherData.length == 0) {
            return res.status(402).json({
                success: false,
                message: 'Invalid Credientals'
            });
        };

         // DEBUG: Log password details
            console.log("Plain Password:", teacherPassword);
            console.log("Hashed Password:", teacherData[0]?.teacherPassword);
            console.log("Password Type:", typeof teacherPassword);
            console.log("Hash Type:", typeof teacherData[0]?.teacherPassword);
            console.log("incomming email", teacherEmail);
        console.log("incomming password", teacherPassword);
        console.log("Password logging hashing", teacherData[0]?.teacherPassword as string)

        const isPasswordMatched = await bcrypt.compare(teacherPassword, teacherData[0]?.teacherPassword as string);
        if (!isPasswordMatched) {
            return res.status(403).json({
                success: false,
                message: 'Invalid Credientals'
            });
        };
        console.log(isPasswordMatched,"isPasswordMatched");

        // const token = TokenGenerationService.generateToken( teacherData[0]?.id as string )
        const token = jwt.sign(
            { id: teacherData[0]?.id as string },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY as string }
        );

        return res.status(200).json({
            datas: { token },
            message: "Teacher Logged in successfully"
        })

    }
}

export default TeacherController;