import { IStatus } from "../../global/types/type"

export type AuthRole = "super-admin" | "admin" | "teacher" | "student" | "user"

export interface IUser {
  id: string,
  username: string,
  email: string,
  role: "super_admin" | "admin" | "teacher" | "student",
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
  role: "super_admin" | "admin" | "teacher" | "student",
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

export interface IProfileApiResponse {
  data: {
    user: IAuthApiUser,
  },
  message: string,
}
