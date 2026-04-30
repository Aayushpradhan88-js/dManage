"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/src/lib/store/hooks/customHook"
import {
  AUTH_STORAGE_KEY,
  clearPersistedAuthUser,
  setUser,
} from "@/src/lib/store/slices/auth/authSlice"
import type { IUser } from "@/src/lib/store/slices/auth/authTypes"

export function AuthHydrator() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedUser) {
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser) as IUser

      if (parsedUser?.token) {
        dispatch(setUser(parsedUser))
      }
    } catch (error) {
      console.error("Failed to restore auth user", error)
      clearPersistedAuthUser()
    }
  }, [dispatch])

  return null
}
