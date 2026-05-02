import type { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../config/env.ts"
import { db } from "../../db/connection.ts"
import type { IExtendedRequest } from "../types/types.ts"
import type { JwtPayload } from "../auth/auth-types.ts"

class UserVerification {
  static async userAuthorizationAccessVerification(
    req:  IExtendedRequest ,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bearerToken = req.headers.authorization
      console.log("middleware", bearerToken)
      const token = bearerToken?.startsWith("Bearer ")
        ? bearerToken.slice(7)
        : bearerToken

      if (!token) {
        return res.status(401).json({ message: "Token not found" })
      }

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
      const userData = await db.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
        },
      })

      if (!userData) {
        return res.status(401).json({ message: "Invalid user" })
      }

      req.user = {
        id: userData.id,
      }

      next()
    } catch (error) {
      return res.status(403).json({
        message: "Invalid token",
        error: (error as Error).message,
      })
    }
  }
}

export default UserVerification
