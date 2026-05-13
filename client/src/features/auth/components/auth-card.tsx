import type { ReactNode } from "react"

type AuthCardProps = {
  eyebrow?: string
  title: string
  children: ReactNode
}

export function AuthCard({ eyebrow, title, children }: AuthCardProps) {
  return (
    <div className="space-y-8">
      <div>
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-2">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  )
}
