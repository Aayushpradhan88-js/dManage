import jwt from "jsonwebtoken"
import { JWT_EXPIRY, JWT_SECRET } from "../../config/env.ts"
import type { JwtPayload } from "../auth/auth-types.ts"

class TokenGenerationService {
  static generateToken(data: JwtPayload) {
    return jwt.sign(
      data,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY, }
    )
  }
}

export default TokenGenerationService
