import { Router } from "express"
import AuthController from "./auth-controller.ts"
import GlobalErrorHandler from "../services/asyncErrorHandler.ts"
const authRouter = Router()

authRouter.route("/register").post(GlobalErrorHandler.asyncErrorHandler(AuthController.registerUser))
authRouter.route("/login").post(GlobalErrorHandler.asyncErrorHandler(AuthController.loginUser))
// authRouter.route("/logout").post()
// authRouter.route("/forgetpassword").post()

export default authRouter
