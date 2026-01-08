import { IStatus } from "../../global/types/types";

interface IUser {
    name: string;
    email: string;
    password: string
};

export interface IAuthType {
    user: IUser;
    status: IStatus
}