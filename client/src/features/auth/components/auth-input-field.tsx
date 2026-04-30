import { ChangeEventHandler } from "react"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type AuthInputFieldProps = {
  id: string
  name: string
  label: string
  type?: string
  value: string
  placeholder: string
  autoComplete?: string
  description?: string
  error?: string
  required?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  trailingAction?: React.ReactNode
}

export function AuthInputField({
  id,
  name,
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  description,
  error,
  required = true,
  onChange,
  trailingAction,
}: AuthInputFieldProps) {
  return (
    <Field>
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {trailingAction}
      </div>

      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 rounded-xl border-slate-200 bg-white"
        required={required}
      />

      {error ? (
        <FieldDescription className="text-red-600">{error}</FieldDescription>
      ) : description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}
    </Field>
  )
}