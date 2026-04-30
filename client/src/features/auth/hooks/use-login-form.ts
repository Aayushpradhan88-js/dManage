"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { APIAuth } from "@/src/lib/store/slices/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook"
import { IStatus } from "@/src/lib/store/global/types/type"
import type { LoginFormValues } from "../types/auth-form"
import { useRouter } from "next/navigation"

const initialValues: LoginFormValues = {
  email: "",
  password: "",
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

    // Redux thunk handles the API side the hook keeps the page lean.
    const isSuccess = await dispatch(APIAuth.login(values))
    if(isSuccess){
      router.push("/")
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