import express from "express"
import GlobalErrorHandler from "../../../global/services/asyncErrorHandler";
import CategoryController from "./categoryController";
import UserVerification from "../../../global/middleware/authMiddleware";

const instituteCategoryRoute = express.Router()

instituteCategoryRoute.route("/")
    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.getAllCategory));
      
instituteCategoryRoute.route("/create-category")
    .post(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.createCategory));

instituteCategoryRoute.route("/:id")
    .post(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.updateSingleCategory))

    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.getSingleCategory))

    .delete(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.deleteSingleCategory))

export default instituteCategoryRoute;