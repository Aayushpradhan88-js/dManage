"use client"

import { FieldGroup } from "@/components/ui/field"
import { AuthShell } from "@/components/auth/auth-shell"

import { AuthCard } from "@/src/features/auth/components/auth-card"
import { AuthInputField } from "@/src/features/auth/components/auth-input-field"
import { AuthLinkPanel } from "@/src/features/auth/components/auth-link-panel"
import { AuthStatusMessage } from "@/src/features/auth/components/auth-status-message"
import { AuthSubmitButton } from "@/src/features/auth/components/auth-submit-button"
import { RegisterTrackCallout } from "@/src/features/auth/components/register-track-callout"
import { RegisterTrackSelector } from "@/src/features/auth/components/register-track-selector"
import useRegisterForm from "@/src/features/auth/hooks/use-register-form"

function Register() {
  const {
    track,
    values,
    authStatus,
    passwordError,
    isSubmitting,
    setTrack,
    handleChange,
    handleSubmit,
  } = useRegisterForm()

  return (
    <AuthShell
      badge="Create account"
      title="Make you're life easier with dManage"
      description="Every user starts with one secure dManage account"
      secondaryCta={{
        href: "/institute/becomeInstitute",
        label: "View institute form",
      }}
    >
      <AuthCard title="Create your dManage account">
        <RegisterTrackSelector value={track} onValueChange={setTrack} />
        <RegisterTrackCallout track={track} />
        <AuthStatusMessage
          status={authStatus}
          successMessage="Account created successfully"
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup className="gap-5">
            <AuthInputField
              id="username"
              name="username"
              label="Full name"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter Your name"
            />

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

            <div className="grid gap-5 md:grid-cols-2">
              <AuthInputField
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
              />

              <AuthInputField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                error={passwordError}
              />
            </div>
          </FieldGroup>

          <AuthSubmitButton
            label="Create account"
            isLoading={isSubmitting}
            disabled={Boolean(passwordError)}
          />
        </form>

        <AuthLinkPanel
          text="Already registered?"
          href="/login"
          linkLabel="Sign in here"
          tone="plain"
        />
      </AuthCard>
    </AuthShell>
  )
}

export default Register
