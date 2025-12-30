import jwt from "jsonwebtoken"
import { JWT_EXPIRY, JWT_SECRET } from "../../../config/env";

class TokenGeneration{
    static async generateToken(data: string){
        const token = jwt.sign(data, JWT_SECRET,{
            expiresIn: JWT_EXPIRY
        })
        return token;
    }
}

export default TokenGeneration;