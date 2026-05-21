import { APIError } from "../../../config/api-error-response.ts"

export type SupportedPhoneCountry = "NP" | "IN"

export interface InstituteApplicationPayload {
  instituteName: string
  instituteEmail: string
  institutePhoneNumber: string
  institutePhoneCountry: SupportedPhoneCountry
  instituteAddress: string
  instituteVatNumber?: string | null
  institutePanNumber?: string | null
}

const PHONE_RULES: Record<
  SupportedPhoneCountry,
  { label: string; countryCode: string; nationalNumberLength: number }
> = {
  NP: { label: "Nepal", countryCode: "+977", nationalNumberLength: 10 },
  IN: { label: "India", countryCode: "+91", nationalNumberLength: 10 },
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

function validatePhoneNumberForCountry(
  country: SupportedPhoneCountry,
  rawValue: string
) {
  const trimmedValue = rawValue.trim()

  if (!trimmedValue) {
    throw new APIError("Phone number is required", 400)
  }

  if (/[A-Za-z]/.test(trimmedValue)) {
    throw new APIError("Text is not allowed in the phone number", 400)
  }

  const rule = PHONE_RULES[country]

  if (!rule) {
    throw new APIError("Selected phone country is not supported", 400)
  }

  const onlyDigits = digitsOnly(trimmedValue)
  const countryDigits = digitsOnly(rule.countryCode)

  if (!onlyDigits) {
    throw new APIError("Phone number must contain digits", 400)
  }

  let nationalNumber = onlyDigits

  if (trimmedValue.startsWith("+")) {
    if (!onlyDigits.startsWith(countryDigits)) {
      throw new APIError(
        `Use a valid ${rule.label} number starting with ${rule.countryCode}`,
        400
      )
    }

    nationalNumber = onlyDigits.slice(countryDigits.length)
  }

  if (nationalNumber.length !== rule.nationalNumberLength) {
    throw new APIError(
      `${rule.label} phone numbers must be exactly ${rule.nationalNumberLength} digits`,
      400
    )
  }
}

function validateGovernmentDocumentNumber(
  value: string | null | undefined,
  label: "PAN" | "VAT"
) {
  const trimmedValue = value?.trim() ?? ""

  if (!trimmedValue) {
    throw new APIError(`${label} number is required`, 400)
  }

  if (!/^\d+$/.test(trimmedValue)) {
    throw new APIError(`${label} number must contain digits only`, 400)
  }

  if (trimmedValue.length !== 9) {
    throw new APIError(`${label} number must be exactly 9 digits`, 400)
  }
}

//Institute Number
export function validateInstituteApplicationPayload(payload: InstituteApplicationPayload) {
  console.log("payload", payload)
  const instituteName = payload?.instituteName?.trim()
  const instituteEmail = payload?.instituteEmail?.trim().toLowerCase()
  const institutePhoneNumber = payload?.institutePhoneNumber?.trim()
  const institutePhoneCountry = payload?.institutePhoneCountry
  const instituteAddress = payload?.instituteAddress?.trim()
  const instituteVatNumber = payload?.instituteVatNumber?.trim() || null
  const institutePanNumber = payload?.institutePanNumber?.trim() || null

  if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
    throw new APIError("Provide all the required fields", 400)
  }

  if (!EMAIL_REGEX.test(instituteEmail)) {
    throw new APIError("Enter a valid institute email address", 400)
  }

  if (!institutePhoneCountry) {
    throw new APIError("Phone country is required", 400)
  }

  validatePhoneNumberForCountry(institutePhoneCountry, institutePhoneNumber)

  const hasPan = Boolean(institutePanNumber)
  const hasVat = Boolean(instituteVatNumber)

  if (hasPan === hasVat) {
    throw new APIError("Submit exactly one document number: PAN or VAT", 400)
  }

  if (hasPan) {
    validateGovernmentDocumentNumber(institutePanNumber, "PAN")
  }

  if (hasVat) {
    validateGovernmentDocumentNumber(instituteVatNumber, "VAT")
  }

  return {
    instituteName,
    instituteEmail,
    institutePhoneNumber,
    institutePhoneCountry,
    instituteAddress,
    instituteVatNumber,
    institutePanNumber,
  }
}
