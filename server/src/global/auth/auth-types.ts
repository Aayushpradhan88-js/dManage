import { InstituteRole, SystemRole } from "@prisma/client"

//Dto - Data Transfer Object
export interface RegisterUserDto {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export interface LoginUserDto {
  email: string,
  password: string,
  rememberMe?: boolean,
}

export interface AuthenticatedUser {
  id: string,
  username: string,
  email: string,
  systemRole: SystemRole,
  activeRole: InstituteRole | "super-admin" | "user",
}

export interface RegisterAuthResponse {
  user: AuthenticatedUser,
}

export interface LoginAuthResponse extends RegisterAuthResponse {
  token: string,
}

export interface JwtPayload {
  id: string,
  email: string,
  systemRole: SystemRole,
}
