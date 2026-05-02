import { db } from "../../db/connection.ts"

export class AuthRepository {
  static async findUserById(id: string) {
    return await db.user.findUnique({
      where: { id },
      include: {
        instituteMemberships: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    })
  }

  static async findUserByEmail(email: string) {
    return await db.user.findUnique({
      where: { email },
      include: {
        instituteMemberships: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
  }

  //create user
  static createUser(username: string, email: string, password: string) {
    return db.user.create({
      data: {
        username,
        email,
        password,
      },
      include: {
        instituteMemberships: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
  }

  //login user
  static loginUser(email: string, password: string) {
    return db.user.findUnique({
      where: { email, password },
      include: {
        instituteMemberships: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    })
  }

  static updateUser(id: string, username: string, email: string) {
    return db.user.update({
      where: { id },
      data: {
        username,
        email,
      },
      include: {
        instituteMemberships: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    })
  }
}
