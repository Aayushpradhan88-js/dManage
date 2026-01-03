//Course Controller

import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

class CourseController {
    //create course
    static async createCourse(req: IExtendedRequest, res: Response) {
        const {
            coursePrice,
            courseName,
            courseDescription,
            courseDuration,
            courseLevel,
           category_id
        } = req.body;
        // console.log("✅step 1: All data from the body", courseName, courseDescription,
        //     coursePrice,
        //     courseDuration,
        //     courseLevel,
        //     // categoryId
        // )

        if (!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel || !category_id) {
            return res.status(400).json({
                errorMessage: 'fill all the required fields'
            });
        };

        const courseThumbnail = req.file ? req.file.path : null
        if (!courseThumbnail) {
            return res.status(400).json({
                errorMessage: 'please provide course thumbnail'
            });
        }
        // console.log('courseThumbnail', courseThumbnail);

        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };
        // console.log("✅ Full req.user:", req.user);
        // console.log("✅ Type of req.user:", typeof req.user);
        // console.log("✅ currentInstituteNumber:", req.user?.currentInstituteNumber);
        // const [instertId, affectedRow] = 
        await sequelize.query(`
            INSERT INTO course_${currentInstituteNumber}(
                courseName,
                coursePrice, 
                courseDescription, 
                courseDuration, 
                courseLevel, 
                courseThumbnail,
                category_id
            ) VALUES(?,?,?,?,?,?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [courseName, coursePrice, courseDescription, courseDuration, courseLevel, courseThumbnail, category_id
            ]
        });
        // console.log({ instertId, affectedRow });
        return res.status(200).json({
            datas: courseThumbnail,
            message: "course created successfully"
        });
    };

    //all course
    static async getAllCourses(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        //Joining course and category
        const fetchedData = await sequelize.query(`
            SELECT * FROM course_${currentInstituteNumber} JOIN category_${currentInstituteNumber} ON course_${currentInstituteNumber}.category_id = category_${currentInstituteNumber}.id
            `, {
            type: QueryTypes.SELECT
        });
        if (!fetchedData) {
            return res.status(400).json({ errorMessage: "failed to fetch data" });
        };

        return res.status(200).json({
            datas: fetchedData,
            message: "All courses fetched successfully"
        });
    };

    //single course
    static async getSingleCourse(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        const courseId = req.params.id;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };
        
        const singleCourse = await sequelize.query(`
            SELECT * FROM course_${currentInstituteNumber} WHERE id=?`
            , {
                type: QueryTypes.SELECT,
                replacements: [courseId]
            });

        return res.status(200).json({
            message: "Course fetched successfully",
            data: singleCourse
        });

    }

    //delete course
    static async deleteSingleCourse(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        const courseId = req.params.id;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };
        const deletedCourse = await sequelize.query(`
            DELETE FROM course_${currentInstituteNumber} WHERE id=?`
            , {
                type: QueryTypes.DELETE,
                replacements: [courseId]
            });

        return res.status(200).json({
            data: deletedCourse,
            message: "Course deleted successfully"
        });
    };

    static async updateSingleCourse(req:IExtendedRequest, res: Response){
        
    }
};

export default CourseController;