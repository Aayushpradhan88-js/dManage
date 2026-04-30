import type { Request, Response } from "express";
import { AuthService } from "./auth-service.ts";
import { ApiResponse } from "../../config/api-response.ts";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    console.log("req", req.body)
    const authResponse = await AuthService.registerUser(req.body);

    console.log("authResponse", authResponse)

    return ApiResponse.success(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: authResponse,
    });
  }

  static async loginUser(req: Request, res: Response) {
    const authResponse = await AuthService.loginUser(req.body);

    return ApiResponse.success(res, {
      statusCode: 200,
      message: "User logged in successfully",
      data: authResponse,
    });
  }
}

export default AuthController;
