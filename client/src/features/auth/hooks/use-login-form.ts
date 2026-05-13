"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { APIAuth } from "@/src/lib/store/slices/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook"
import { IStatus } from "@/src/lib/store/global/types/type"
import type { LoginFormValues } from "../types/auth-form"
import { useRouter } from "next/navigation"
import type { IUser } from "@/src/lib/store/slices/auth/authTypes"

const initialValues: LoginFormValues = {
  email: "",
  password: "",
}

function resolveDashboardPath(user: IUser) {
  if (user.systemRole === "super_admin" || user.activeRole === "super-admin") {
    return "/super-admin/dashboard"
  }

  if (user.activeRole === "admin") {
    return "/institute/admin/dashboard"
  }

  if (user.activeRole === "teacher") {
    return "/teacher/dashboard"
  }

  if (user.activeRole === "student") {
    return "/student/dashboard"
  }

  return "/"
}

function useLoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((state) => state.auth.status)
  const [values, setValues] = useState<LoginFormValues>(initialValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // The login response is derived from the current database record, which
    // keeps dashboard routing aligned with the user's persisted role.
    const loggedInUser = await dispatch(APIAuth.login(values))
    if (loggedInUser) {
      router.push(resolveDashboardPath(loggedInUser))
    }
  }

  return {
    values,
    authStatus,
    isSubmitting: authStatus === IStatus.LOADING,
    handleChange,
    handleSubmit,
  }
}

export default useLoginForm
