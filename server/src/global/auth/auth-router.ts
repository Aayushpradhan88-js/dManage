import { Router } from "express"
import AuthController from "./auth-controller.ts"
import GlobalErrorHandler from "../services/asyncErrorHandler.ts"
import UserVerification from "../middleware/authMiddleware.ts"
const authRouter = Router()

authRouter.route("/register").post(GlobalErrorHandler.asyncErrorHandler(AuthController.registerUser))
authRouter.route("/login").post(GlobalErrorHandler.asyncErrorHandler(AuthController.loginUser))
authRouter
  .route("/profile")
  .get(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(AuthController.getProfile)
  )
  .put(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(AuthController.updateProfile)
  )
// authRouter.route("/logout").post()
// authRouter.route("/forgetpassword").post()

export default authRouter
