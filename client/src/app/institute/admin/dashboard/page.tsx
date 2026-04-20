"use client"

import {
  IconUsers,
  IconSchool,
  IconUserCheck,
  IconBook2,
  IconClipboardList,
  IconSpeakerphone,
  IconUserPlus,
  IconCertificate,
} from "@tabler/icons-react"
import {
  StatCard,
  PageHeader,
  ActivityItem,
} from "@/src/lib/components/dashboard/dashboard-primitives"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table"
import { Badge } from "@/src/lib/components/ui/badge"

const recentMembers = [
  { name: "Aarav Sharma", role: "Student", joinedAt: "2 hours ago", status: "Active" },
  { name: "Priya Thapa", role: "Teacher", joinedAt: "5 hours ago", status: "Active" },
  { name: "Bikash Gurung", role: "Student", joinedAt: "1 day ago", status: "Pending" },
  { name: "Sita Rai", role: "Student", joinedAt: "2 days ago", status: "Active" },
  { name: "Rajesh KC", role: "Teacher", joinedAt: "3 days ago", status: "Active" },
]

const recentActivity = [
  {
    title: "New enrollment",
    description: "Aarav Sharma enrolled in Advanced JavaScript",
    time: "2h ago",
    icon: IconClipboardList,
  },
  {
    title: "Course published",
    description: "React Fundamentals is now live",
    time: "5h ago",
    icon: IconBook2,
  },
  {
    title: "New teacher",
    description: "Priya Thapa joined as a teacher",
    time: "5h ago",
    icon: IconUserPlus,
  },
  {
    title: "Announcement posted",
    description: "Exam schedule for Spring term",
    time: "1d ago",
    icon: IconSpeakerphone,
  },
  {
    title: "Certificate issued",
    description: "12 students completed Python Basics",
    time: "2d ago",
    icon: IconCertificate,
  },
]

export default function InstituteAdminOverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Your institute at a glance"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Members"
          value="248"
          icon={IconUsers}
          trend={{ value: "+12%", positive: true }}
          description="from last month"
        />
        <StatCard
          title="Teachers"
          value="18"
          icon={IconSchool}
          trend={{ value: "+2", positive: true }}
          description="this month"
        />
        <StatCard
          title="Students"
          value="226"
          icon={IconUserCheck}
          trend={{ value: "+8%", positive: true }}
          description="from last month"
        />
        <StatCard
          title="Active Courses"
          value="14"
          icon={IconBook2}
          description="across 6 categories"
        />
      </div>

      {/* Two column layout for activity + recent members */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-0 px-2 pb-4">
            {recentActivity.map((activity, i) => (
              <ActivityItem key={i} {...activity} />
            ))}
          </CardContent>
        </Card>

        {/* Recent Members */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMembers.map((member, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          member.status === "Active"
                            ? "text-green-700 border-green-200 bg-green-50"
                            : "text-amber-700 border-amber-200 bg-amber-50"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">
                      {member.joinedAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}