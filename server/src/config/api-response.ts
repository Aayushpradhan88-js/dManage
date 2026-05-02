import type { Response } from "express";

export class ApiResponse {
  //success response
  static success<T>(
    res: Response,
    options: {
      statusCode?: number;
      message: string;
      data?: T;
    }
  ) {
    const { statusCode = 200, message, data } = options;

    return res.status(statusCode).json({
      success: true,
      message,
      data: data ?? null,
    });
  }

  //error response
  static error(
    res: Response,
    options: {
      statusCode?: number;
      message: string;
      errors?: unknown;
    }
  ) {
    const { statusCode = 500, message, errors = null } = options;

    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}
