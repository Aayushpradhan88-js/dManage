import type { IUser } from "@/src/lib/store/slices/auth/authTypes"

type JwtPayload = {
  exp?: number
}

export function resolveDashboardPath(user: IUser) {
  if (user.role === "super_admin" || user.activeRole === "super-admin") {
    return "/super-admin/dashboard"
  }

  if (user.role === "admin" || user.activeRole === "admin") {
    return "/platform/admin/dashboard"
  }

  if (user.role === "teacher" || user.activeRole === "teacher") {
    return "/teacher/dashboard"
  }

  if (user.role === "student" || user.activeRole === "student") {
    return "/student/dashboard"
  }

  return "/"
}

export function resolveCoursesPath(user: IUser) {
  if (user.role === "admin" || user.activeRole === "admin") {
    return "/platform/admin/dashboard/courses"
  }

  if (user.role === "teacher" || user.activeRole === "teacher") {
    return "/teacher/dashboard/courses"
  }

  if (user.role === "student" || user.activeRole === "student") {
    return "/student/dashboard/courses"
  }

  return resolveDashboardPath(user)
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1]

    if (!payload) {
      return null
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/")
    const decodedPayload = atob(normalizedPayload)

    return JSON.parse(decodedPayload) as JwtPayload
  } catch (error) {
    console.error("Failed to decode token payload", error)
    return null
  }
}

export function isTokenExpired(token: string) {
  const payload = decodeJwtPayload(token)

  if (!payload?.exp) {
    return true
  }

  return payload.exp * 1000 <= Date.now()
}
