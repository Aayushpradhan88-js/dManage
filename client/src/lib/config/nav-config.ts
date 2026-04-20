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
  items: NavItem[]
}

export const roleNavConfigs: Record<string, RoleNavConfig> = {
  "super-admin": {
    roleId: "super-admin",
    label: "Super Admin",
    basePath: "/super-admin/dashboard",
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
        title: "Institutes",
        url: "/super-admin/dashboard/institutes",
        icon: IconBuildingCommunity,
      },
      {
        title: "Institute Applications",
        url: "/super-admin/dashboard/applications",
        icon: IconFileText,
      },
    ],
  },
  "institute-admin": {
    roleId: "institute-admin",
    label: "Institute Admin",
    basePath: "/institute/admin/dashboard",
    items: [
      {
        title: "Overview",
        url: "/institute/admin/dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "Members",
        url: "/institute/admin/dashboard/members",
        icon: IconUsers,
      },
      {
        title: "Teachers",
        url: "/institute/admin/dashboard/teachers",
        icon: IconSchool,
      },
      {
        title: "Students",
        url: "/institute/admin/dashboard/students",
        icon: IconUserCheck,
      },
      {
        title: "Quick Live",
        url: "/institute/admin/dashboard/quick-live",
        icon: IconVideo,
      },
      {
        title: "Courses",
        url: "/institute/admin/dashboard/courses",
        icon: IconBook2,
      },
      {
        title: "Enrollments",
        url: "/institute/admin/dashboard/enrollments",
        icon: IconClipboardList,
      },
      {
        title: "Lessons",
        url: "/institute/admin/dashboard/lessons",
        icon: IconNotebook,
      },
      {
        title: "Announcements",
        url: "/institute/admin/dashboard/announcements",
        icon: IconSpeakerphone,
      },
      {
        title: "Settings",
        url: "/institute/admin/dashboard/settings",
        icon: IconSettings,
      },
    ],
  },
  teacher: {
    roleId: "teacher",
    label: "Teacher",
    basePath: "/teacher/dashboard",
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
