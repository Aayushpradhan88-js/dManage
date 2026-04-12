import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";

class StudentController{
    static async createStudent(req:IExtendedRequest, res: Response){
        const currentInstitute = req.user?.currentInstituteNumber;

        await sequelize
    }
}