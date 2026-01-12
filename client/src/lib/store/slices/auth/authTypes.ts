import { IStatus } from "../../global/types/type";

export interface IUser {
    username: string;
    email: string;
    password: string
};

export interface IAuthInitialStateType {
    user: IUser;
    status: IStatus
};