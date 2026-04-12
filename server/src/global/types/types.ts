import { Request } from "express";

interface IExtendedRequest extends Request {
    user?: {
        id: string,
        currentInstituteNumber?: string
    }
}

export default IExtendedRequest;