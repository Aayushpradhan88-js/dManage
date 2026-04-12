//Generate Token Service

import jwt from "jsonwebtoken"
import { JWT_EXPIRY, JWT_SECRET } from "../../../config/env";

class TokenGenerationService{
    static generateToken(data: string){
        const token = jwt.sign(data, JWT_SECRET,{
            expiresIn: JWT_EXPIRY
        });
        return token;
    };
};

export default TokenGenerationService;