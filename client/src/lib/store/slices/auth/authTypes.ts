import { IStatus } from "../../global/types/type";

export interface IUser {
    username: string;
    token: string
};

export interface IAuthInitialStateType {
    user: IUser;
    status: IStatus
};