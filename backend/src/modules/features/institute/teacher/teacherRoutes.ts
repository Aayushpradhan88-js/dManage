import express from 'express'
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler';
import TeacherController from './teacherController';
import UserVerification from '../../../global/middleware/authMiddleware';
import upload from '../../../global/middleware/cloudinaryMiddleware';

const instituteTeacherRouter = express.Router();

instituteTeacherRouter.route("/create").post(
    UserVerification.userAuthorizationAccessVerification,
    upload.single('teacherPhoto'), //upload photo
    GlobalErrorHandler.asyncErrorHandler(TeacherController.createTeacher)
);

instituteTeacherRouter.route("/").get(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(TeacherController.getAllTeacher)
);

instituteTeacherRouter.route("/:id").get(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(TeacherController.getSingleTeacher)
);

instituteTeacherRouter.route("/:id").delete(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(TeacherController.getSingleTeacher)
);

export default instituteTeacherRouter;