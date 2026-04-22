"use client";

//make a field validation on email and password and confirm password and username


import Link from "next/link";
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { IRegister } from "./registerTypes";
import { APIAuth } from "@/src/lib/store/slices/auth/authSlice";
import { useAppDispatch } from "@/src/lib/store/hooks/customHook";

type RegisterTrack = "student" | "institute-admin";

function Register() {
  const dispatch = useAppDispatch();
  const [track, setTrack] = useState<RegisterTrack>("student");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword:""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const passwordsMatch = useMemo(
    () => !confirmPassword || userData.password === confirmPassword,
    [confirmPassword, userData.password]
  );

  const handlRegisterSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordsMatch) {
      return;
    }

    try {
      dispatch(APIAuth.register(userData));
    } catch (error) {
      console.error("Registration failed", error);
      alert(`Registration failed. Please try again ${(error as Error).message}`);
    }
  };

  return (
    <AuthShell
      badge="Create account"
      title="Make you're life easier with dManage"
      description="Every user starts with one secure dManage account" 
      // panelTitle="Recommended flow"
      // panelDescription="For v1, keep registration focused on one personal identity. Do not let someone become an institute admin instantly from the signup form. Instead, guide them to a second application step after account creation."
      // features={[
      //   {
      //     title: "Student-first onboarding",
      //     description:
      //       "Most new users should be able to register in under one minute and enter the platform immediately.",
      //   },
      //   {
      //     title: "Institute admin application",
      //     description:
      //       "Prospective institute admins create a personal account first, then submit institute details for review.",
      //   },
      //   {
      //     title: "Teacher accounts by invitation",
      //     description:
      //       "Teachers should usually be invited by an institute instead of self-registering directly in v1.",
      //   },
      //   {
      //     title: "Safer permissions",
      //     description:
      //       "This flow prevents random users from self-assigning higher roles before backend approval exists.",
      //   },
      // ]}
      // primaryCta={{ href: "/login", label: "Already have an account?" }}
      // secondaryCta={{ href: "/institute/becomeInstitute", label: "View institute form" }}
    >
      <Card className="overflow-hidden border-slate-200/80 bg-white/95 py-0 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur">
        <CardHeader className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
              <div>
              <CardTitle className="mt-2 text-3xl text-slate-950">
                Create your dManage account
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6 sm:px-8">
          <Tabs
            value={track}
            onValueChange={(value) => setTrack(value as RegisterTrack)}
            className="gap-5"
          >
            <TabsContent value="institute-admin" className="mt-0">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-950">
                      Two-step institute admin journey
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
                      First create your personal account here. Then continue to
                      the institute application form so the super admin can
                      review and approve your request.
                    </p>
                    <Link
                      href="/institute/becomeInstitute"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900"
                    >
                      Open institute admin application
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handlRegisterSubmission} className="space-y-5">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="username">Full name</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={userData.username}
                  onChange={handleChange}
                  placeholder="Aayush Pradhan"
                  className="h-12 rounded-xl border-slate-200 bg-white"
                  required
                />
                <FieldDescription>
                  Use your real name so institutes can identify you during
                  approval or invitation.
                </FieldDescription>
              </Field>

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

              <div className="grid gap-5 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className="h-12 rounded-xl border-slate-200 bg-white"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="h-12 rounded-xl border-slate-200 bg-white"
                    required
                  />
                  {!passwordsMatch && (
                    <FieldDescription className="text-red-600">
                      Passwords do not match yet.
                    </FieldDescription>
                  )}
                </Field>
              </div>
            </FieldGroup>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800"
              disabled={!passwordsMatch}
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Sign in here
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}

export default Register;
