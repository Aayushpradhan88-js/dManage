"use client"

import { FieldGroup } from "@/components/ui/field"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthCard } from "@/src/features/auth/components/auth-card"
import { AuthInputField } from "@/src/features/auth/components/auth-input-field"
import { AuthLinkPanel } from "@/src/features/auth/components/auth-link-panel"
import { AuthStatusMessage } from "@/src/features/auth/components/auth-status-message"
import { AuthSubmitButton } from "@/src/features/auth/components/auth-submit-button"
import useLoginForm  from "@/src/features/auth/hooks/use-login-form"

function Login() {
  const { values, authStatus, isSubmitting, handleChange, handleSubmit } =
    useLoginForm()

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
      <AuthCard eyebrow="Welcome back" title="Sign in to dManage">
        <AuthStatusMessage status={authStatus} />

        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup className="gap-5">
            <AuthInputField
              id="email"
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@dmanage.com"
            />

            <AuthInputField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              trailingAction={
                <button
                  type="button"
                  className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                >
                  Forgot password?
                </button>
              }
            />
          </FieldGroup>

          <AuthSubmitButton
            label="Sign in"
            isLoading={isSubmitting}
            tone="emerald"
          />
        </form>

        <AuthLinkPanel
          text="Want to create a new personal account first?"
          href="/register"
          linkLabel="Go to register"
        />
      </AuthCard>
    </AuthShell>
  )
}

export default Login
