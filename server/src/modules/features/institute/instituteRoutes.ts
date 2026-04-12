import express from 'express'
import userVerification from '../../global/middleware/authMiddleware';
import InstituteController from './instituteController';
import GlobalErrorHandler from '../../global/services/asyncErrorHandler';

const instituteRouter = express.Router();

instituteRouter.route("/").post(
    userVerification.userAuthorizationAccessVerification,
    InstituteController.createInstitute,
    InstituteController.createTeacherTable,
    InstituteController.createStudentTable,
    InstituteController.createCourseTable,
    InstituteController.createCategoryTable,
    GlobalErrorHandler.asyncErrorHandler(InstituteController.createCourseChapterTable)
);

export default instituteRouter;