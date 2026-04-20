"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/lib/components/ui/card"
import { Badge } from "@/src/lib/components/ui/badge"
import { type Icon } from "@tabler/icons-react"
import { IconInbox } from "@tabler/icons-react"

/* ── Stat Card ────────────────────────────────────────── */

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: Icon
  trend?: { value: string; positive: boolean }
}

export function StatCard({ title, value, description, icon: IconComp, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {IconComp && <IconComp className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            {trend && (
              <Badge
                variant="outline"
                className={
                  trend.positive
                    ? "text-green-700 border-green-200 bg-green-50"
                    : "text-red-700 border-red-200 bg-red-50"
                }
              >
                {trend.value}
              </Badge>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ── Page Header ──────────────────────────────────────── */

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

/* ── Empty State ──────────────────────────────────────── */

interface EmptyStateProps {
  icon?: Icon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: IconComp = IconInbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-white py-16 text-center">
      <IconComp className="mb-4 size-10 text-muted-foreground/50" />
      <h3 className="text-base font-medium">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/* ── Recent Activity Item ─────────────────────────────── */

interface ActivityItemProps {
  title: string
  description: string
  time: string
  icon?: Icon
}

export function ActivityItem({ title, description, time, icon: IconComp }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-md px-3 py-2.5 hover:bg-gray-50/80 transition-colors">
      {IconComp && (
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
          <IconComp className="size-4" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">{time}</span>
    </div>
  )
}
