"use client"

import React from "react"
import { DashboardShell } from "@/src/lib/components/dashboard/dashboard-shell"
import { roleNavConfigs } from "@/src/lib/config/nav-config"

export default function InstituteAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell config={roleNavConfigs["institute-admin"]}>
      {children}
    </DashboardShell>
  )
}