"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconLeaf } from "@tabler/icons-react"

import { type RoleNavConfig } from "@/src/lib/config/nav-config"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/src/lib/components/ui/sidebar"
import { NavUser } from "@/src/lib/components/nav-user"

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  config: RoleNavConfig
}

const dummyUser = {
  name: "Aayush Pradhan",
  email: "aayush@dmanage.io",
  avatar: "",
}

export function DashboardSidebar({ config, ...props }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Brand header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={config.basePath}>
                <IconLeaf className="!size-5 text-green-600" />
                <span className="text-base font-semibold">dManage</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Navigation items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {config.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.items.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== config.basePath &&
                    pathname.startsWith(item.url + "/"))

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={
                        isActive
                          ? "bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                          : ""
                      }
                    >
                      <Link href={item.url}>
                        <item.icon className={isActive ? "text-green-600" : ""} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer */}
      <SidebarFooter>
        <NavUser user={dummyUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
