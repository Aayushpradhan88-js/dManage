import { Router } from "express";
import AuthController from "./authController";
import GlobalErrorHandler from "../services/asyncErrorHandler";
const authRouter = Router();

authRouter.route("/register").post(GlobalErrorHandler.asyncErrorHandler(AuthController.registerUser));
authRouter.route("/login").post(GlobalErrorHandler.asyncErrorHandler(AuthController.loginUser));
// authRouter.route("/logout").post();
// authRouter.route("/forgetpassword").post();

export default authRouter;