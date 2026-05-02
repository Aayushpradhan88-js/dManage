//Teacher Controller

import { Response } from "express";
import { IExtendedRequest } from "../../global/types/types";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../../../config/env";

interface ITeacherData {
    id: string,
    teacherInstituteNumber: string | number,
    teacherEmail: string,
    teacherPassword: string,
}

class TeacherController {
    static async teacherLogin(req: { IExtendedRequest }, res: Response) {
        const { teacherInstituteNumber, teacherEmail, teacherPassword } = req.body;

        if (!teacherInstituteNumber || !teacherEmail || !teacherPassword) {
            return res.status(400).json({
                success: false,
                message: 'Fill all the required fields'
            });
        }

        // Query teacher data
        const teacherData: ITeacherData[] = await sequelize.query(
            `SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail = ?`,
            {
                type: QueryTypes.SELECT,
                replacements: [teacherEmail]
            }
        );

        console.log(teacherData, "teacherData");

        // Check if teacher exists
        if (!teacherData || teacherData.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials - User not found'
            });
        }

        // DEBUG: Log password details
        console.log("Plain Password:", teacherPassword);
        console.log("Hashed Password:", teacherData[0]?.teacherPassword);
        console.log("Password Type:", typeof teacherPassword);
        console.log("Hash Type:", typeof teacherData[0]?.teacherPassword);

        // Compare password
        const isPasswordMatched = await bcrypt.compare(
            teacherPassword.trim(), // Remove any whitespace
            teacherData[0]?.teacherPassword as string
        );

        console.log("Password Matched:", isPasswordMatched);

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials - Password mismatch'
            });
        }

        // Generate token
        const token = jwt.sign(
            {
                id: teacherData[0]?.id,
                email: teacherData[0]?.teacherEmail
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        );

        return res.status(200).json({
            success: true,
            data: {
                token,
                teacher: {
                    id: teacherData[0]?.id,
                    email: teacherData[0]?.teacherEmail
                }
            },
            message: "Teacher logged in successfully"
        });
    }
}

export default TeacherController;