import type { NextFunction, Request, Response } from "express"
import { APIError } from "../../config/api-error-response.ts"
import { ApiResponse } from "../../config/api-response.ts"

class GlobalErrorHandler {
  static asyncErrorHandler<T = void>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((error: Error) => {
        const statusCode = error instanceof APIError ? error.statusCode : 500
        const message = error.message || "Something went wrong"

        console.error("Request failed", error)

        return ApiResponse.error(res, {
          statusCode,
          message,
          errors: statusCode >= 500 ? error.stack : null,
        })
      })
    }
  }
}

export default GlobalErrorHandler