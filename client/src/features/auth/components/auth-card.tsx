import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type AuthCardProps = {
  eyebrow?: string
  title: string
  children: ReactNode
}

export function AuthCard({ eyebrow, title, children }: AuthCardProps) {
  return (
    <Card className="overflow-hidden border-slate-200/80 bg-white/95 py-0 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur">
      <CardHeader className="border-b border-slate-100 px-6 py-6 sm:px-8">
        <div>
          {eyebrow ? (
            <p className="text-sm font-semibold text-emerald-700">
              {eyebrow}
            </p>
          ) : null}
          <CardTitle className="mt-2 text-3xl text-slate-950">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6 py-6 sm:px-8">{children}</CardContent>
    </Card>
  )
}
