"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { IconLoader2, IconUser } from "@tabler/icons-react"
import { APIWithToken } from "@/src/lib/store/global/API/apiCall"
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook"
import {
  clearPersistedAuthUser,
  clearUser,
  patchUser,
  persistAuthUser,
} from "@/src/lib/store/slices/auth/authSlice"
import type { IAuthApiUser, IUser } from "@/src/lib/store/slices/auth/authTypes"
import { Button } from "@/src/lib/components/ui/button"
import { Input } from "@/src/lib/components/ui/input"
import { Label } from "@/src/lib/components/ui/label"

interface ProfileApiResponse {
  data: {
    user: IAuthApiUser
  }
  message: string
}

function ProfilePage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const authUser = useAppSelector((state) => state.auth.user)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authUser.token) {
        router.push("/login")
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage("")

        const response = await APIWithToken.get<ProfileApiResponse>("/api/auth/profile")
        const profileUser = response.data.data.user

        setFormValues({
          username: profileUser.username,
          email: profileUser.email,
        })

        const nextUser: IUser = {
          ...authUser,
          ...profileUser,
        }

        dispatch(patchUser(profileUser))
        persistAuthUser(nextUser)
      } catch (error) {
        console.error("Failed to fetch profile", error)
        setErrorMessage("Unable to load your profile right now.")

        clearPersistedAuthUser()
        dispatch(clearUser())
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [authUser.token, dispatch, router])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    setFormValues({
      username: authUser.username,
      email: authUser.email,
    })
    setIsEditing(false)
    setErrorMessage("")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setIsSaving(true)
      setErrorMessage("")

      const response = await APIWithToken.put<ProfileApiResponse>("/api/auth/profile", formValues)
      const profileUser = response.data.data.user

      setFormValues({
        username: profileUser.username,
        email: profileUser.email,
      })

      const nextUser: IUser = {
        ...authUser,
        ...profileUser,
      }

      dispatch(patchUser(profileUser))
      persistAuthUser(nextUser)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile", error)
      setErrorMessage("Unable to update your profile right now.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#161616] px-4 py-16 text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-center rounded-[28px] border border-white/20 bg-[#2f6b39] p-10">
          <IconLoader2 className="h-8 w-8 animate-spin" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#161616] px-4 py-16">
      <section className="mx-auto max-w-4xl rounded-[28px] border border-white/35 bg-[#2f6b39] px-6 py-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:px-10 sm:py-10">
        <h1 className="text-center text-3xl font-semibold tracking-tight">
          {isEditing ? "Edit Profile" : "User Profile"}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_140px] md:items-start">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xl font-medium text-white">
                Name
              </Label>
              {isEditing ? (
                <Input
                  id="username"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  className="h-14 rounded-xl border-white/70 bg-white/10 px-4 text-xl text-white placeholder:text-white/60"
                />
              ) : (
                <p className="text-2xl font-medium text-white">{formValues.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xl font-medium text-white">
                Email
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="h-14 rounded-xl border-white/70 bg-white/10 px-4 text-xl text-white placeholder:text-white/60"
                />
              ) : (
                <p className="text-2xl font-medium text-white">{formValues.email}</p>
              )}
            </div>

            {errorMessage ? (
              <p className="text-sm font-medium text-red-100">{errorMessage}</p>
            ) : null}

            <div className="flex flex-wrap gap-4 pt-2">
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="h-12 min-w-24 rounded-xl border border-white bg-transparent px-6 text-xl text-white hover:bg-white/10"
                  >
                    {isSaving ? "Saving..." : "Edit"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="h-12 min-w-24 rounded-xl border border-white bg-transparent px-6 text-xl text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="h-12 min-w-24 rounded-xl border border-white bg-transparent px-6 text-xl text-white hover:bg-white/10"
                >
                  Edit
                </Button>
              )}
            </div>
          </form>

          <div className="flex justify-center md:justify-end">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white text-white">
              <IconUser className="h-14 w-14 stroke-[1.5]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProfilePage
