"use client"

import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { APIAuth } from "@/src/lib/store/slices/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook"
import { IStatus } from "@/src/lib/store/global/types/type"
import type { RegisterFormValues, RegisterTrack } from "../types/auth-form"

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function useRegisterForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((state) => state.auth.status)
  const [track, setTrack] = useState<RegisterTrack>("student")
  const [values, setValues] = useState<RegisterFormValues>(initialValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const passwordError = useMemo(() => {
    if (!values.confirmPassword) {
      return ""
    }

    return values.password === values.confirmPassword
      ? ""
      : "Passwords do not match yet."
  }, [values.confirmPassword, values.password])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (passwordError) {
      return
    }

    // We keep backend validation as the source of truth and use this check
    // only to avoid unnecessary requests from the form.
    const isSuccess = await dispatch(APIAuth.register(values))
    if (isSuccess) {
      router.push("/")
    }
  }

  return {
    track,
    values,
    authStatus,
    passwordError,
    isSubmitting: authStatus === IStatus.LOADING,
    setTrack,
    handleChange,
    handleSubmit,
  }
}

export default useRegisterForm