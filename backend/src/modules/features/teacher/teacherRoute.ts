import express from "express"
import GlobalErrorHandler from "../../global/services/asyncErrorHandler";
import TeacherController from "./teacherController";
const teacherLoginRoute = express.Router();

teacherLoginRoute.route("/teacher-login").post(
    GlobalErrorHandler.asyncErrorHandler(TeacherController.teacherLogin)
);

export default teacherLoginRoute;