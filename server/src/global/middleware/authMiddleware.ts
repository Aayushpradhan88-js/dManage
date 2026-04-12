import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env";
import { User } from "../../../database/models/userModel";
import IExtendedRequest from "../types/types";

class UserVerification {
    static userAuthorizationAccessVerification(req: IExtendedRequest, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization; //getting token from headers
            if (!token) {
                return res.status(401).json({ message: "Token not found" });
            };

            //verifying token
            jwt.verify((token as string), JWT_SECRET, async (error, decoded: any) => {
                if (error) {
                    return res.status(403).json({ message: "Invalid token" })
                };

                //verifying is user existes or not 
                const userData = await User.findByPk(decoded.id,{
                    attributes: ['id', 'currentInstituteNumber']
                });
                if (!userData) {
                    return res.status(401).json({ message: "Invalid user" })
                };

                req.user = {
                    'id': userData.id,
                    'currentInstituteNumber': userData.currentInstituteNumber
                }
                next();
            });
        } catch (error) {
            console.error("✗ Server Error: Failed to authorize user", (error as Error).stack);
            return res.status(500).json({
                errorMessage: (error as Error).message,
                fullErrorMessage: error
            });
        };
    };
};

export default UserVerification;