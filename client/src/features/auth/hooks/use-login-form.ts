"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { APIAuth } from "@/src/lib/store/slices/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook"
import { IStatus } from "@/src/lib/store/global/types/type"
import type { LoginFormValues } from "../types/auth-form"
import { useRouter } from "next/navigation"
import { resolveDashboardPath } from "../utils/auth-session"

const initialValues: LoginFormValues = {
  email: "",
  password: "",
}

function useLoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((state) => state.auth.status)
  const user = useAppSelector((state) => state.auth.user)
  const [values, setValues] = useState<LoginFormValues>(initialValues)

  useEffect(() => {
    const redirectAuthenticatedUser = async () => {
      if (user.token) {
        router.replace(resolveDashboardPath(user))
        return
      }

      const validatedUser = await dispatch(APIAuth.validateStoredSession())

      if (validatedUser) {
        router.replace(resolveDashboardPath(validatedUser))
      }
    }

    void redirectAuthenticatedUser()
  }, [dispatch, router, user])

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
