"use client"

import * as React from "react"
import { Toaster } from "sonner"
import { type RoleNavConfig } from "@/src/lib/config/nav-config"
import {
  SidebarProvider,
  SidebarInset,
} from "@/src/lib/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"

interface DashboardShellProps {
  config: RoleNavConfig
  breadcrumbs?: { label: string; href?: string }[]
  children: React.ReactNode
}

export function DashboardShell({
  config,
  breadcrumbs,
  children,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar config={config} />
      <SidebarInset>
        <DashboardHeader breadcrumbs={breadcrumbs} />
        <div className="flex-1 overflow-auto bg-gray-50/50">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </SidebarInset>
      <Toaster position="bottom-center" richColors />
    </SidebarProvider>
  )
}
