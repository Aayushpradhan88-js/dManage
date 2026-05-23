import express from "express"
import SuperAdminController from "./superAdminController.ts"
import GlobalErrorHandler from "../../../global/services/asyncErrorHandler.ts"
import UserVerification from "../../../global/middleware/authMiddleware.ts"

const superAdminRouter = express.Router()

superAdminRouter
  .route("/applications")
  .get(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(SuperAdminController.getPlatformApplications)
  )

superAdminRouter
  .route("/applications/:id/status")
  .patch(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(SuperAdminController.updatePlatformApplicationStatus)
  )

export default superAdminRouter
