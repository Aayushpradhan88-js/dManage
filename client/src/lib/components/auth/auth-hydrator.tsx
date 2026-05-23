"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/src/lib/store/hooks/customHook"
import { APIAuth } from "@/src/lib/store/slices/auth/authSlice"

export function AuthHydrator() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(APIAuth.validateStoredSession())
  }, [dispatch])

  return null
}
