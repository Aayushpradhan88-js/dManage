import express from "express"
import SuperAdminController from "./superAdminController.ts"
import GlobalErrorHandler from "../../../global/services/asyncErrorHandler.ts"
import UserVerification from "../../../global/middleware/authMiddleware.ts"

const superAdminRouter = express.Router()

superAdminRouter
  .route("/applications")
  .get(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(SuperAdminController.getInstituteApplications)
  )

superAdminRouter
  .route("/applications/:id/status")
  .patch(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(SuperAdminController.updateInstituteApplicationStatus)
  )

export default superAdminRouter
