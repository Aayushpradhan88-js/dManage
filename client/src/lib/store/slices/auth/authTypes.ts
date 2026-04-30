import { IStatus } from "../../global/types/type"

export type AuthRole = "super-admin" | "admin" | "teacher" | "student" | "user"

export interface IUser {
  id: string,
  username: string,
  email: string,
  systemRole: "user" | "super_admin",
  activeRole: AuthRole,
  token: string,
}

export interface IAuthInitialStateType {
  user: IUser,
  status: IStatus,
}

export interface IAuthApiUser {
  id: string,
  username: string,
  email: string,
  systemRole: "user" | "super_admin",
  activeRole: AuthRole,
}

export interface IRegisterApiResponse {
  data: {
    user: IAuthApiUser,
  },
  message: string,
}

export interface ILoginApiResponse {
  data: {
    user: IAuthApiUser,
    token: string,
  },
  message: string,
}
