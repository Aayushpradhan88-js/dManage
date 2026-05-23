"use client"

import Link from "next/link"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
} from "lucide-react"
import { APIInstitute } from "@/src/lib/store/slices/institute/instituteSlice"
import { IInstituteState } from "@/src/lib/store/slices/institute/instituteSliceTypes"
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks/customHook"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IStatus } from "@/src/lib/store/global/types/type"
import {
  hasInstituteFormErrors,
  normalizeInstitutePhoneNumber,
  SUPPORTED_PHONE_COUNTRIES,
  type InstituteDocumentType,
  type InstituteFormErrors,
  validateInstituteForm,
} from "@/src/features/institute/validation/institute-form"

const InstitutePage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const instituteStatus = useAppSelector((state) => state.institute.status)
  const [documentType, setDocumentType] = useState<InstituteDocumentType>("pan")
  const [errors, setErrors] = useState<InstituteFormErrors>({})
  const [instituteData, setInstituteData] = useState<IInstituteState>({
    instituteName: "",
    instituteEmail: "",
    institutePhoneNumber: "",
    institutePhoneCountry: "NP",
    instituteAddress: "",
    instituteVatNumber: "",
    institutePanNumber: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const nextValue =
      name === "institutePhoneNumber" ? normalizeInstitutePhoneNumber(value) : value

    setInstituteData((current) => ({
      ...current,
      [name]: nextValue,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }))
  }

  const handleInstituteCreateSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const sanitizedPayload: IInstituteState = {
      ...instituteData,
      instituteName: instituteData.instituteName.trim(),
      instituteEmail: instituteData.instituteEmail.trim().toLowerCase(),
      institutePhoneNumber: instituteData.institutePhoneNumber.trim(),
      instituteAddress: instituteData.instituteAddress.trim(),
      institutePanNumber:
        documentType === "pan" ? instituteData.institutePanNumber?.trim() ?? "" : "",
      instituteVatNumber:
        documentType === "vat" ? instituteData.instituteVatNumber?.trim() ?? "" : "",
    }

    const validationErrors = validateInstituteForm(sanitizedPayload, documentType)
    setErrors(validationErrors)

    if (hasInstituteFormErrors(validationErrors)) {
      return
    }

    //api calling
    const isSubmitted = await dispatch(APIInstitute.createInstitute(sanitizedPayload))
    
    if (isSubmitted) {
      router.push("/platform/application-status")
    }
  }

  return (
    <AuthShell
      badge="Institute application"
      title="Apply to become an institute admin."
      description="This page should feel like a reviewable business application, not a casual signup form. We need enough information for the super admin to approve with confidence."
      secondaryCta={{ href: "/login", label: "Already signed in?" }}
    >
      <div className="space-y-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Institute admin request form
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            Please provide accurate details to help our team verify your institute.
          </p>
        </div>

        {/* <div className="grid gap-4 sm:grid-cols-3">
          <div className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md hover:border-emerald-100">
            <MailCheck className="mb-2 h-5 w-5 text-emerald-600" />
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Official Email
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Use your registered business email for communication.
            </p>
          </div>
          <div className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md hover:border-emerald-100">
            <FileCheck2 className="mb-2 h-5 w-5 text-emerald-600" />
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Legal Docs
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Valid PAN or VAT document is required for verification.
            </p>
          </div>
          <div className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md hover:border-emerald-100">
            <ShieldAlert className="mb-2 h-5 w-5 text-emerald-600" />
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Verification
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Applications are manually reviewed within 24-48 hours.
            </p>
          </div>
        </div> */}

        <form onSubmit={handleInstituteCreateSubmission} className="space-y-6">
          <FieldGroup className="gap-6">
            <Field>
              <FieldLabel htmlFor="instituteName" className="text-sm font-medium text-slate-900">Institute Name</FieldLabel>
              <Input
                id="instituteName"
                name="instituteName"
                type="text"
                placeholder="enter institute name"
                value={instituteData.instituteName}
                onChange={handleChange}
                className="h-12 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-slate-900 transition-all shadow-sm text-slate-900"
                required
              />
              {errors.instituteName && (
                <FieldDescription className="text-red-600">{errors.instituteName}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="instituteEmail" className="text-sm font-medium text-slate-900">Institute Email</FieldLabel>
              <Input
                id="instituteEmail"
                name="instituteEmail"
                type="email"
                placeholder="enter email"
                value={instituteData.instituteEmail}
                onChange={handleChange}
                className="h-12 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-slate-900 transition-all shadow-sm text-slate-900"
                required
              />
              {errors.instituteEmail && (
                <FieldDescription className="text-red-600">{errors.instituteEmail}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel className="text-sm font-medium text-slate-900">Phone Number</FieldLabel>
              <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]">
                <Select
                  value={instituteData.institutePhoneCountry}
                  onValueChange={(value) => {
                    setInstituteData((current) => ({
                      ...current,
                      institutePhoneCountry: value as IInstituteState["institutePhoneCountry"],
                    }))
                    setErrors((currentErrors) => ({
                      ...currentErrors,
                      institutePhoneCountry: undefined,
                      institutePhoneNumber: undefined,
                    }))
                  }}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white shadow-sm text-slate-900">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-200 bg-white text-slate-900">
                    {SUPPORTED_PHONE_COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label} ({country.countryCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="institutePhoneNumber"
                  name="institutePhoneNumber"
                  type="text"
                  placeholder="9XXXXXXXXX"
                  value={instituteData.institutePhoneNumber}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-slate-900 transition-all shadow-sm text-slate-900"
                  required
                />
              </div>
              {(errors.institutePhoneCountry || errors.institutePhoneNumber) && (
                <FieldDescription className="text-red-600">
                  {errors.institutePhoneCountry || errors.institutePhoneNumber}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="instituteAddress" className="text-sm font-medium text-slate-900">Address</FieldLabel>
              <Input
                id="instituteAddress"
                name="instituteAddress"
                type="text"
                placeholder="enter your address"
                value={instituteData.instituteAddress}
                onChange={handleChange}
                className="h-12 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-slate-900 transition-all shadow-sm text-slate-900"
                required
              />
              {errors.instituteAddress && (
                <FieldDescription className="text-red-600">{errors.instituteAddress}</FieldDescription>
              )}
            </Field>

            {documentType === "pan" ? (
              <Field>
                <FieldLabel htmlFor="institutePanNumber" className="text-sm font-medium text-slate-900">Pan number</FieldLabel>
                <Input
                  id="institutePanNumber"
                  name="institutePanNumber"
                  type="text"
                  placeholder="enter 9-digit PAN"
                  value={instituteData.institutePanNumber ?? ""}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-slate-900 transition-all shadow-sm text-slate-900"
                />
                {errors.institutePanNumber && (
                  <FieldDescription className="text-red-600">{errors.institutePanNumber}</FieldDescription>
                )}
              </Field>
            ) : (
              <Field>
                <FieldLabel htmlFor="instituteVatNumber" className="text-sm font-medium text-slate-900">Vat number</FieldLabel>
                <Input
                  id="instituteVatNumber"
                  name="instituteVatNumber"
                  type="text"
                  placeholder="enter 9-digit VAT"
                  value={instituteData.instituteVatNumber ?? ""}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-slate-900 transition-all shadow-sm text-slate-900"
                />
                {errors.instituteVatNumber && (
                  <FieldDescription className="text-red-600">{errors.instituteVatNumber}</FieldDescription>
                )}
              </Field>
            )}

            <Field>
              <FieldLabel className="text-sm font-medium text-slate-900">Document Type</FieldLabel>
              <Select
                value={documentType}
                onValueChange={(value) => {
                  setDocumentType(value as InstituteDocumentType)
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    institutePanNumber: undefined,
                    instituteVatNumber: undefined,
                  }))
                }}
              >
                <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white shadow-sm text-slate-900">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 bg-white text-slate-900">
                  <SelectItem value="pan">PAN Number</SelectItem>
                  <SelectItem value="vat">VAT Number</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              disabled={instituteStatus === IStatus.LOADING}
              className="h-12 w-full rounded-xl bg-slate-900 text-white cursor-pointer hover:bg-slate-800 transition-all shadow-sm font-medium"
            >
              {instituteStatus === IStatus.LOADING ? "Submitting..." : "Submit Application"}
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-12 w-full rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            >
              <Link href="/register">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to account creation
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </AuthShell>
  )
}

export default InstitutePage
