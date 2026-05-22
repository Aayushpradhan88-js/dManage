import express from 'express'
import userVerification from '../../../global/middleware/authMiddleware.ts'
import InstituteController from './instituteController.ts'
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler.ts'

const instituteRouter = express.Router()

instituteRouter.route("/").post(
    userVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(InstituteController.createTeacherTable),
    GlobalErrorHandler.asyncErrorHandler(InstituteController.createStudentTable),
    GlobalErrorHandler.asyncErrorHandler(InstituteController.createCourseTable),
    GlobalErrorHandler.asyncErrorHandler(InstituteController.createCategoryTable),
    GlobalErrorHandler.asyncErrorHandler(InstituteController.createCourseChapterTable)
)

instituteRouter.route("/institute-creation").post(
    userVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(InstituteController.createInstitute)
)

instituteRouter.route("/my-application").get(
    userVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(InstituteController.getMyInstituteApplication)
)

export default instituteRouter
