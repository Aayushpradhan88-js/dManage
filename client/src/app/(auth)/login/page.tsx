"use client"

import Link from "next/link"
import React, { ChangeEvent, FormEvent, useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  Shield,
  UserRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthShell } from "@/components/auth/auth-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ILogin } from "./loginTypes"
import { useAppDispatch } from "@/src/lib/store/hooks/customHook"
import { APIAuth } from "@/src/lib/store/slices/auth/authSlice"

// const roleContent = {
//   student: {
//     icon: GraduationCap,
//     title: "Student access",
//     description:
//       "Sign in to continue your enrolled courses, lesson progress, and orders.",
//     destination:
//       "After login, students should land on the student dashboard.",
//   },
//   teacher: {
//     icon: BookOpen,
//     title: "Teacher workspace",
//     description:
//       "Teachers use the same email and password flow, then access assigned courses and student tools.",
//     destination:
//       "After login, teachers should land on the teacher dashboard.",
//   },
//   institute: {
//     icon: Building2,
//     title: "Institute admin console",
//     description:
//       "Institute admins manage courses, announcements, enrollments, and their team from one place.",
//     destination:
//       "After login, institute admins should land on the institute admin dashboard.",
//   },
//   superAdmin: {
//     icon: Shield,
//     title: "Super admin control",
//     description:
//       "Super admins review institute applications, users, and cross-platform activity.",
//     destination:
//       "After login, super admins should land on the super admin dashboard.",
//   },
// } as const

function Login() {
  const dispatch = useAppDispatch()
  // const [activeRole, setActiveRole] =    useState<keyof typeof roleContent>("student")
  const [userData, setUserData] = useState<ILogin>({
    email: "",
    password: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handlLoginSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(APIAuth.login(userData))
    } catch (error) {
      console.error("Login failed", error)
      alert(`Login failed. Please try again ${(error as Error).message}`)
    }
  }

  // const selectedRole = roleContent[activeRole]

  return (
    <AuthShell
      badge="Secure login"
      title="dManage"
      description="Keep the login simple"
      secondaryCta={{
        href: "/institute/becomeInstitute",
        label: "Register your institute",
      }}
    >
      <Card className="overflow-hidden border-slate-200/80 bg-white/95 py-0 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur">
        <CardHeader className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            {/* <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound className="h-5 w-5" />
            </div> */}
            <div>
              <p className="text-sm text-3xl font-semibold text-emerald-700">
                Welcome back
              </p>
              <CardTitle className="mt-2 text-3xl text-slate-950">
                Sign in to dManage
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-6 py-6 sm:px-8">
          <form onSubmit={handlLoginSubmission} className="space-y-5">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="you@dmanage.com"
                  className="h-12 rounded-xl border-slate-200 bg-white"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="h-12 rounded-xl border-slate-200 bg-white"
                  required
                />
              </Field>
            </FieldGroup>

            <Button              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Want to create a new personal account first?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Go to register
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  )
}

export default Login
