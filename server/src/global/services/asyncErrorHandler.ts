//Error Handler File

import { NextFunction, Request, Response } from "express"

// console.log("✅error handler code triggered")
class GlobalErrorHandler {
    static asyncErrorHandler<T = void>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) {
        return (req: Request, res: Response, next: NextFunction) => {
            // console.log("✅success message triggered")
            fn(req, res, next).catch((error: Error) => {
                console.error("ERROR", error);
                return res.status(500).json({
                    message: error.message,
                    fullError: error
                });
            });
        };
    };
};

export default GlobalErrorHandler;