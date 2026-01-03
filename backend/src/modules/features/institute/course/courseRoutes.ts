//Course Router

import express from 'express'
import CourseController from './courseController';
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler';
import UserVerification from '../../../global/middleware/authMiddleware';
import upload from '../../../global/middleware/cloudinaryMiddleware';

const instituteCourseRouter = express.Router();

// console.log("✅Router triggered")
instituteCourseRouter.route("/")
    .post(UserVerification.userAuthorizationAccessVerification,
        upload.single('courseThumbnail'), //upload image
        GlobalErrorHandler.asyncErrorHandler(CourseController.createCourse))

    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.getAllCourses))

instituteCourseRouter.route("/:id")
    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.getSingleCourse))

    .delete(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.deleteSingleCourse))

instituteCourseRouter.route("/update/:id")
    .post(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.updateSingleCourse))

export default instituteCourseRouter;