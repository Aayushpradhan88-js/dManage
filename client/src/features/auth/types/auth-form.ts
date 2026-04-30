export type RegisterTrack = "student" | "institute-admin"

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
