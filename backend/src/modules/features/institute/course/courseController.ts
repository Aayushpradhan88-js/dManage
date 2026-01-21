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
            success: true,
            datas: {
                institute: currentInstituteNumber,
                categoryName: courseName,
                categoryDescription: courseDescription
            },
            message: `course created successfully at institute ${currentInstituteNumber}`
        });
    };

    //all course
    static async getAllCourses(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };
        // console.log("number", currentInstituteNumber);
        const getAllCourses = await sequelize.query(`
            SELECT * FROM course_${currentInstituteNumber} 
            ORDER BY createdAt DESC
            `, {
            type: QueryTypes.SELECT
        });
        // console.log("results", getAllCourses)
        if (!getAllCourses) {
            return res.status(400).json({ errorMessage: "failed to fetch data" });
        };

        return res.status(200).json({
            success: true,
            datas: getAllCourses,
            message: "All courses fetched successfully"
        });
    };

    //single course
    static async getSingleCourse(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber?.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const courseId = req.params?.id;
        if (!courseId) {
            return res.status(400).json({
                message: 'invalid course Id'
            });
        };

        const singleCourse = await sequelize.query(`
            SELECT * FROM course_${currentInstituteNumber} WHERE id=?`
            , {
                type: QueryTypes.SELECT,
                replacements: [courseId]
            });

        return res.status(200).json({
            success: true,
            data: singleCourse,
            message: "Course fetched successfully",
        });
    };

    //update course`
    static async updateSingleCourse(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const courseId = req.params.id;
        if (!courseId) {
            return res.status(400).json({
                message: 'invalid course Id'
            });
        };

        const {
            courseName,
            courseDescription,
            coursePrice,
            courseDuration,
            courseLevel
        } = req.body;

        const courseThumbnail = req.file ? req?.file?.path : null

        //updating course data - 1
        await sequelize.query(`
                UPDATE  course_${currentInstituteNumber}
                SET courseName=?,
                    courseDescription=?,
                    coursePrice=?,
                    courseDuration=?,
                    courseLevel=?,
                    courseThumbnail=?,
                    updatedAt=NOW()
                WHERE id=?
            `, {
            type: QueryTypes.UPDATE,
            replacements: [
                courseName,
                courseDescription,
                coursePrice,
                courseDuration,
                courseLevel,
                courseThumbnail,
                courseId
            ]
        });
        // console.log("data", updatedData); output: [null, 1]

        //fetching the updated course - 2
        const updatedData = await sequelize.query(`
            SELECT * FROM course_${currentInstituteNumber} 
            WHERE id=?
            `, {
                replacements: [courseId],
                type: QueryTypes.SELECT
            }
        );
            // console.log(updatedData)

        return res.status(200).json({
            success: true,
            datas: {
                instituteNumber: currentInstituteNumber,
                updatedData
            },
            message: "Course updated successfully"
        });
    };

     //delete course
    static async deleteSingleCourse(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        const courseId = req.params.id;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const deletedCourse = await sequelize.query(`
            DELETE FROM course_${currentInstituteNumber} 
            WHERE id=?`
            , {
                replacements: [courseId],
                type: QueryTypes.DELETE,
            });

        return res.status(200).json({
            success: true,
            data: deletedCourse,
            message: `Course deleted successfully from institute ${currentInstituteNumber} `
        });
    };

};

export default CourseController;