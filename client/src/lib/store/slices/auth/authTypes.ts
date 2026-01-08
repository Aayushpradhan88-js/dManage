import { IStatus } from "../../global/types/type";

interface IUser {
    name: string;
    email: string;
    password: string
};

export interface IAuthInitialStateType {
    user: IUser;
    status: IStatus
};