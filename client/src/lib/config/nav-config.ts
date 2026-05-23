"use client"

import {
  IconLayoutDashboard,
  IconUsers,
  IconSchool,
  IconBook2,
  IconClipboardList,
  IconNotebook,
  IconSpeakerphone,
  IconSettings,
  IconFileText,
  IconBuildingCommunity,
  IconUserCheck,
  IconPlayerPlay,
  IconChartBar,
  IconShoppingCart,
  type Icon,
  IconVideo,
  IconUsersGroup,
  IconExternalLink,
} from "@tabler/icons-react"

export type NavItem = {
  title: string
  url: string
  icon: Icon
  badge?: string | number
}

export type RoleNavConfig = {
  roleId: string
  label: string
  basePath: string
  visitWebsiteUrl?: string
  items: NavItem[]
}

export const roleNavConfigs: Record<string, RoleNavConfig> = {
  "super-admin": {
    roleId: "super-admin",
    label: "Super Admin",
    basePath: "/super-admin/dashboard",
    visitWebsiteUrl: "/",
    items: [
      {
        title: "Overview",
        url: "/super-admin/dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "Users",
        url: "/super-admin/dashboard/users",
        icon: IconUsers,
      },
      {
        title: "Students",
        url: "/super-admin/dashboard/students",
        icon: IconUserCheck,
      },
      {
        title: "Teachers",
        url: "/super-admin/dashboard/teachers",
        icon: IconSchool,
      },
      {
        title: "Platforms",
        url: "/super-admin/dashboard/institutes",
        icon: IconBuildingCommunity,
      },
      {
        title: "Platform Applications",
        url: "/super-admin/dashboard/applications",
        icon: IconFileText,
      },
    ],
  },
  "institute-admin": {
    roleId: "institute-admin",
    label: "Platform Admin",
    basePath: "/platform/admin/dashboard",
    visitWebsiteUrl: "/",
    items: [
      {
        title: "Overview",
        url: "/platform/admin/dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "Members",
        url: "/platform/admin/dashboard/members",
        icon: IconUsers,
      },
      {
        title: "Teachers",
        url: "/platform/admin/dashboard/teachers",
        icon: IconSchool,
      },
      {
        title: "Students",
        url: "/platform/admin/dashboard/students",
        icon: IconUserCheck,
      },
      {
        title: "Quick Live",
        url: "/platform/admin/dashboard/quick-live",
        icon: IconVideo,
      },
      {
        title: "Courses",
        url: "/platform/admin/dashboard/courses",
        icon: IconBook2,
      },
      {
        title: "Enrollments",
        url: "/platform/admin/dashboard/enrollments",
        icon: IconClipboardList,
      },
      {
        title: "Lessons",
        url: "/platform/admin/dashboard/lessons",
        icon: IconNotebook,
      },
      {
        title: "Announcements",
        url: "/platform/admin/dashboard/announcements",
        icon: IconSpeakerphone,
      },
      {
        title: "Settings",
        url: "/platform/admin/dashboard/settings",
        icon: IconSettings,
      },
    ],
  },
  teacher: {
    roleId: "teacher",
    label: "Teacher",
    basePath: "/teacher/dashboard",
    visitWebsiteUrl: "/",
    items: [
      {
        title: "Overview",
        url: "/teacher/dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "My Courses",
        url: "/teacher/dashboard/courses",
        icon: IconBook2,
      },
      {
        title: "Course Content",
        url: "/teacher/dashboard/content",
        icon: IconNotebook,
      },
      {
        title: "Take Live Class",
        url: "/teacher/dashboard/live-class",
        icon: IconVideo,
      },
      {
        title: "Students",
        url: "/teacher/dashboard/students",
        icon: IconUserCheck,
      },
      {
        title: "Announcements",
        url: "/teacher/dashboard/announcements",
        icon: IconSpeakerphone,
      },
    ],
  },
  student: {
    roleId: "student",
    label: "Student",
    basePath: "/student/dashboard",
    visitWebsiteUrl: "/",
    items: [
      {
        title: "Overview",
        url: "/student/dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "My Courses",
        url: "/student/dashboard/courses",
        icon: IconBook2,
      },
      {
        title: "Course Player",
        url: "/student/dashboard/player",
        icon: IconPlayerPlay,
      },
      {
        title: "Live Class",
        url: "/student/dashboard/live-class",
        icon: IconVideo,
      },
      {
        title: "Progress",
        url: "/student/dashboard/progress",
        icon: IconChartBar,
      },
      {
        title: "Group Discussions",
        url: "/student/dashboard/group-discussions",
        icon: IconUsersGroup,
      },
      {
        title: "Announcements",
        url: "/student/dashboard/announcements",
        icon: IconSpeakerphone,
      },
    ],
  },
}
