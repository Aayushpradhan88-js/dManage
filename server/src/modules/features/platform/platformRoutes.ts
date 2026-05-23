import express from 'express'
import userVerification from '../../../global/middleware/authMiddleware.ts'
import PlatformController from './platformController.ts'
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler.ts'

const platformRouter = express.Router()

platformRouter.route("/public").get(
    GlobalErrorHandler.asyncErrorHandler(PlatformController.getPublicPlatforms)
)

platformRouter.route("/public/:id").get(
    GlobalErrorHandler.asyncErrorHandler(PlatformController.getPublicPlatformDetail)
)

platformRouter.route("/").post(
    userVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(PlatformController.createTeacherTable),
    GlobalErrorHandler.asyncErrorHandler(PlatformController.createStudentTable),
    GlobalErrorHandler.asyncErrorHandler(PlatformController.createCourseTable),
    GlobalErrorHandler.asyncErrorHandler(PlatformController.createCategoryTable),
    GlobalErrorHandler.asyncErrorHandler(PlatformController.createCourseChapterTable)
)

platformRouter.route("/application").post(
    userVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(PlatformController.createPlatform)
)

platformRouter.route("/my-application").get(
    userVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(PlatformController.getMyPlatformApplication)
)

export default platformRouter
