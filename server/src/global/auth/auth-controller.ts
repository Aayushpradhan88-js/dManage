import type { Request, Response } from "express";
import { AuthService } from "./auth-service.ts";
import { ApiResponse } from "../../config/api-response.ts";
import type { IExtendedRequest } from "../types/types.ts";

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

  //get profile
  static async getProfile(req:  IExtendedRequest , res: Response) {
    const authResponse = await AuthService.getProfile(req.user!.id) //confirming it is actually object not null and undefined
    return ApiResponse.success(res, {
      statusCode: 200,
      message: "Profile fetched successfully",  
      data: authResponse,
    });
  }

  //update profile
  static async updateProfile(req:  IExtendedRequest , res: Response) {
    const authResponse = await AuthService.updateProfile(req.user!.id, req.body);

    return ApiResponse.success(res, {
      statusCode: 200,
      message: "Profile updated successfully",
      data: authResponse,
    });
  }
}

export default AuthController;
