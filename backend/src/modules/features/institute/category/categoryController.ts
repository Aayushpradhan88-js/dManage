import { Response, response } from "express"
import IExtendedRequest from "../../../global/types/types"
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

class CategoryController {
    //create category
    static async createCategory(req: IExtendedRequest, res: Response) {
        console.log("create category API triggered");
        const instituteNumber = req.user?.currentInstituteNumber;
        if (!instituteNumber || instituteNumber.trim().length === 0) {
            return res.status(400).json({
                message: 'invalid institute number'
            });
        };

        const { categoryName, categoryDescription } = req.body;
        console.log(categoryName, categoryDescription);
        if (!categoryName || !categoryDescription) {
            return res.status(400).json({
                message: 'fill all the required fields'
            });
        };

        await sequelize.query(`
            INSERT INTO category_${instituteNumber}(
                categoryName,
                categoryDescription
            ) VALUES(?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [categoryName, categoryDescription]
        });

        return res.status(200).json({
            success: true,
            datas: {
                institute: instituteNumber,
                categoryName: categoryName,
                categoryDescription: categoryDescription
            },
            message: `Successfully created ${categoryName} category at institute ${instituteNumber}`
        });
    };

    //get all category
    static async getAllCategory(req: IExtendedRequest, res: Response) {
        // console.log("DB-server triggered");
        const instituteNumber = req.user?.currentInstituteNumber;
        if (!instituteNumber || instituteNumber.trim().length === 0) {
            return res.status(400).json({
                message: 'invalid institute number'
            });
        };

        const getAllCategory = await sequelize.query(`
            SELECT * FROM category_${instituteNumber} 
            ORDER BY createdAt DESC
        `, {
            type: QueryTypes.SELECT
        });
        if (!getAllCategory) {
            return res.status(400).json({ errorMessage: "failed to fetch data" });
        };

        return res.status(200).json({
            datas: getAllCategory,
            success: true,
            message: "All category fetched successfully"
        });
    };

    //single category
    static async getSingleCategory(req: IExtendedRequest, res: Response) {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(400).json({
                message: 'invalid category Id'
            });
        };

        const instituteNumber = req.user?.currentInstituteNumber;
        if (!instituteNumber || instituteNumber.trim().length === 0) {
            return res.status(400).json({
                message: 'invalid institute number'
            });
        };

        const [results] = await sequelize.query(`
                SELECT * FROM category_${instituteNumber} WHERE id=? 
            `, {
            type: QueryTypes.SELECT,
            replacements: [categoryId]
        });

        if (!results) {
            return res.status(404).json({
                message: 'Category not found'
            });
        };

        return res.status(200).json({
            datas: results,
            success: true,
            message: "single category fetched successfully"
        });
    };

    //update category
    static async updateSingleCategory(req: IExtendedRequest, res: Response) {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(400).json({
                message: 'invalid category Id'
            });
        };

        const instituteNumber = req.user?.currentInstituteNumber;
        if (!instituteNumber || instituteNumber.trim().length === 0) {
            return res.status(400).json({
                message: 'invalid institute number'
            });
        };

        const { categoryName, categoryDescription } = req.body;
        if (!categoryName || !categoryDescription) {
            return res.status(400).json({
                message: 'Invalid data'
            });
        };

        const [results] = await sequelize.query(`
                UPDATE category_${instituteNumber} 
                SET categoryName=?, categoryDescription=?, updatedAt=NOW()
                WHERE id=?
            `, {
            type: QueryTypes.UPDATE,
            replacements: [categoryName, categoryDescription, categoryId]
        });

        console.log(results)

        if (results === 0) {
            return res.status(404).json({
                message: 'Category not found'
            });
        };

        return res.status(200).json({
            datas: results,
            success: true,
            message: "category updated successfully"
        });
    };

    //delete category
    static async deleteSingleCategory(req: IExtendedRequest, res: Response) {
        const categoryId = req.params.id;
        console.log("categoryId", categoryId);
        if (!categoryId) {
            return res.status(400).json({
                message: 'invalid category Id'
            });
        };

        const instituteNumber = req.user?.currentInstituteNumber;
        if (!instituteNumber || instituteNumber.trim().length === 0) {
            return res.status(400).json({
                message: 'invalid institute number'
            });
        };

        await sequelize.query(`
                DELETE FROM category_${instituteNumber} WHERE id=?
            `, {
            type: QueryTypes.DELETE,
            replacements: [categoryId]
        });

        // if (results === 0) {
        //     return res.status(400).json({
        //         message: 'Category not found'
        //     });
        // }

        return res.status(200).json({
            // datas: results,
            success: true,
            message: "category deleted successfully"
        });
    };
};

export default CategoryController;