"use client"

export type SupportedPhoneCountry = "NP" | "IN" 
export type InstituteDocumentType = "pan" | "vat"

export interface InstituteFormValues {
  instituteName: string
  instituteEmail: string
  institutePhoneNumber: string
  institutePhoneCountry: SupportedPhoneCountry
  instituteAddress: string
  instituteVatNumber?: string
  institutePanNumber?: string
}

export interface InstituteFormErrors {
  instituteName?: string
  instituteEmail?: string
  institutePhoneNumber?: string
  institutePhoneCountry?: string
  instituteAddress?: string
  instituteVatNumber?: string
  institutePanNumber?: string
}

const PHONE_RULES: Record<
  SupportedPhoneCountry,
  { label: string; countryCode: string; nationalNumberLength: number }
> = {
  NP: { label: "Nepal", countryCode: "+977", nationalNumberLength: 10 },
  IN: { label: "India", countryCode: "+91", nationalNumberLength: 10 },
}

export const SUPPORTED_PHONE_COUNTRIES = Object.entries(PHONE_RULES).map(
  ([value, rule]) => ({
    value: value as SupportedPhoneCountry,
    label: rule.label,
    countryCode: rule.countryCode,
    nationalNumberLength: rule.nationalNumberLength,
  })
)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

export function normalizeInstitutePhoneNumber(rawValue: string) {
  return rawValue.replace(/[^\d+\s\-()]/g, "")
}

export function validatePhoneNumberForCountry(
  country: SupportedPhoneCountry,
  rawValue: string
) {
  const trimmedValue = rawValue.trim()

  if (!trimmedValue) {
    return "Phone number is required."
  }

  if (/[A-Za-z]/.test(trimmedValue)) {
    return "Text is not allowed in the phone number."
  }

  const rule = PHONE_RULES[country]
  const onlyDigits = digitsOnly(trimmedValue)
  const countryDigits = digitsOnly(rule.countryCode)

  if (!onlyDigits) {
    return "Phone number must contain digits."
  }

  let nationalNumber = onlyDigits

  // Allow either plain national format or the matching international format.
  if (trimmedValue.startsWith("+")) {
    if (!onlyDigits.startsWith(countryDigits)) {
      return `Use a valid ${rule.label} number starting with ${rule.countryCode}.`
    }

    nationalNumber = onlyDigits.slice(countryDigits.length)
  }

  if (nationalNumber.length > rule.nationalNumberLength) {
    return `Only ${rule.nationalNumberLength} digits are allowed for ${rule.label} numbers.`
  }

  if (nationalNumber.length < rule.nationalNumberLength) {
    return `${rule.label} phone numbers must be exactly ${rule.nationalNumberLength} digits.`
  }

  return undefined
}

export function validateGovernmentDocumentNumber(
  value: string | undefined,
  label: "PAN" | "VAT"
) {
  const trimmedValue = value?.trim() ?? ""

  if (!trimmedValue) {
    return `${label} number is required.`
  }

  if (!/^\d+$/.test(trimmedValue)) {
    return `${label} number must contain digits only.`
  }

  if (trimmedValue.length !== 9) {
    return `${label} number must be exactly 9 digits.`
  }

  return undefined
}

export function validateInstituteForm(
  values: InstituteFormValues,
  documentType: InstituteDocumentType
) {
  const errors: InstituteFormErrors = {}

  if (!values.instituteName.trim()) {
    errors.instituteName = "Institute name is required."
  }

  if (!values.instituteEmail.trim()) {
    errors.instituteEmail = "Institute email is required."
  } else if (!EMAIL_REGEX.test(values.instituteEmail.trim())) {
    errors.instituteEmail = "Enter a valid institute email address."
  }

  if (!values.instituteAddress.trim()) {
    errors.instituteAddress = "Institute address is required."
  }

  errors.institutePhoneNumber = validatePhoneNumberForCountry(
    values.institutePhoneCountry,
    values.institutePhoneNumber
  )

  if (documentType === "pan") {
    errors.institutePanNumber = validateGovernmentDocumentNumber(
      values.institutePanNumber,
      "PAN"
    )
  } else {
    errors.instituteVatNumber = validateGovernmentDocumentNumber(
      values.instituteVatNumber,
      "VAT"
    )
  }

  return errors
}

export function hasInstituteFormErrors(errors: InstituteFormErrors) {
  return Object.values(errors).some(Boolean)
}
