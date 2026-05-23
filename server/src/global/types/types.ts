import type { Request } from "express";

export interface IExtendedRequest extends Request {
    user?: {
        id: string,
        currentPlatformNumber?: string
        currentInstituteNumber?: string
    }
}
