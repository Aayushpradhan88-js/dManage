import bcrypt from "bcrypt"
import { InstituteRole, SystemRole } from "@prisma/client"
import type { User } from "@prisma/client"
import { AuthRepository } from "./auth-repository.ts"
import type {
  AuthenticatedUser,
  LoginAuthResponse,
  LoginUserDto,
  ProfileAuthResponse,
  RegisterAuthResponse,
  RegisterUserDto,
  UpdateProfileDto,
} from "./auth-types.ts"
import TokenGenerationService from "../services/generateToken.ts"
import { APIError } from "../../config/api-error-response.ts"

export class AuthService {

  
  //register
  static async registerUser(payload: RegisterUserDto): Promise<RegisterAuthResponse> {
    const sanitizedPayload = this.validateRegisterPayload(payload)

    const existingUser = await AuthRepository.findUserByEmail(sanitizedPayload.email) //checking is email exists (db call)
    if (existingUser) {
      throw new APIError("An account with this email already exists", 409)
    }

    const hashedPassword = await bcrypt.hash(sanitizedPayload.password, 12)
    const createdUser = await AuthRepository.createUser( //creating user (db call)
      sanitizedPayload.username,
      sanitizedPayload.email,
      hashedPassword
    )

    return {
      user: this.toAuthenticatedUser(createdUser),
    }
  }

  //login
  static async loginUser(payload: LoginUserDto): Promise<LoginAuthResponse> {
    const sanitizedPayload = this.validateLoginPayload(payload)
    const user = await AuthRepository.findUserByEmail(sanitizedPayload.email)

    if (!user) {
      throw new APIError("Invalid email or password", 401)
    }

    const isPasswordMatched = await bcrypt.compare(
      sanitizedPayload.password,
      user.password
    )

    if (!isPasswordMatched) {
      throw new APIError("Invalid email or password", 401)
    }

    const authUser = this.toAuthenticatedUser(user)
    const token = TokenGenerationService.generateToken({
      id: user.id,
      email: user.email,
      systemRole: user.systemRole,
    })

    return {
      user: authUser,
      token,
    }
  }

  //get profile
  static async getProfile(userId: string): Promise<ProfileAuthResponse> {
    console.log("userId", userId)
    const user = await AuthRepository.findUserById(userId)
    console.log("user", user)

    if (!user) {
      throw new APIError("User not found", 404)
    }

    return {
      user: this.toAuthenticatedUser(user),
    }
  }

  //update profile
  static async updateProfile(
    userId: string,
    payload: UpdateProfileDto
  ): Promise<ProfileAuthResponse> {
    const sanitizedPayload = this.validateProfilePayload(payload)
    const user = await AuthRepository.findUserById(userId)

    if (!user) {
      throw new APIError("User not found", 404)
    }

    const existingUser = await AuthRepository.findUserByEmail(sanitizedPayload.email)
    if (existingUser && existingUser.id !== userId) {
      throw new APIError("An account with this email already exists", 409)
    }

    const updatedUser = await AuthRepository.updateUser(
      userId,
      sanitizedPayload.username,
      sanitizedPayload.email
    )

    return {
      user: this.toAuthenticatedUser(updatedUser),
    }
  }

  //register validation
  private static validateRegisterPayload(payload: RegisterUserDto): RegisterUserDto {
    console.log("payload", payload)
    const username = payload?.username?.trim()
    const email = payload?.email?.trim().toLowerCase()
    const password = payload?.password?.trim()
    const confirmPassword = payload?.confirmPassword?.trim()

    if (!username || !email || !password || !confirmPassword) {
      throw new APIError("Fill all the required fields", 400)
    }

    if (password.length < 8) {
      throw new APIError("Password must be at least 8 characters long", 400)
    }

    if (password !== confirmPassword) {
      throw new APIError("Passwords do not match", 400)
    }

    return { username, email, password, confirmPassword }
  }

  //login validation
  private static validateLoginPayload(payload: LoginUserDto): LoginUserDto {
    const email = payload?.email?.trim().toLowerCase()
    const password = payload?.password?.trim()

    if (!email || !password) {
      throw new APIError("All fields are required", 400)
    }

    return { email, password }
  }

  //profile validation
  private static validateProfilePayload(payload: UpdateProfileDto): UpdateProfileDto {
    const username = payload?.username?.trim()
    const email = payload?.email?.trim().toLowerCase()

    if (!username || !email) {
      throw new APIError("Name and email are required", 400)
    }

    return { username, email }
  }

  //For authenticated user who wants to enter in platform validation
  private static toAuthenticatedUser(
    user: User & { instituteMemberships: Array<{ role: InstituteRole }> }
  ): AuthenticatedUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      systemRole: user.systemRole,
      // We surface one "activeRole" to keep frontend redirects simple in v1.
      activeRole: this.resolveActiveRole(user.systemRole, user.instituteMemberships[0]?.role),
    }
  }

  //resolve active role
  private static resolveActiveRole(
    systemRole: SystemRole,
    membershipRole?: InstituteRole
  ): AuthenticatedUser["activeRole"] {
    if (systemRole === SystemRole.super_admin) {
      return "super-admin"
    }

    if (membershipRole) {
      return membershipRole
    }

    return "user"
  }
}
