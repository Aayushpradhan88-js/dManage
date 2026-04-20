"use client"

import {
  IconBook2,
  IconUserCheck,
  IconClipboardList,
  IconNotebook,
  IconSpeakerphone,
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
import { Badge } from "@/src/lib/components/ui/badge"

const myCourses = [
  { title: "Advanced JavaScript", students: 24, lessons: 8, status: "Published" },
  { title: "React Fundamentals", students: 18, lessons: 12, status: "Published" },
  { title: "UI/UX Design Principles", students: 0, lessons: 6, status: "Draft" },
]

const recentActivity = [
  {
    title: "New enrollment",
    description: "Aarav Sharma enrolled in Advanced JavaScript",
    time: "2h ago",
    icon: IconClipboardList,
  },
  {
    title: "Lesson completed",
    description: "Sita Rai completed 'Closures Deep Dive'",
    time: "4h ago",
    icon: IconNotebook,
  },
  {
    title: "Assignment submitted",
    description: "Deepak Bhatta submitted JS Patterns assignment",
    time: "6h ago",
    icon: IconBook2,
  },
  {
    title: "Announcement posted",
    description: "Exam prep guidelines for Spring term",
    time: "1d ago",
    icon: IconSpeakerphone,
  },
]

export default function TeacherOverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Welcome back, Priya"
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="My Courses"
          value="3"
          icon={IconBook2}
          description="2 published, 1 draft"
        />
        <StatCard
          title="Total Students"
          value="42"
          icon={IconUserCheck}
          trend={{ value: "+5", positive: true }}
          description="this month"
        />
        <StatCard
          title="Active Enrollments"
          value="38"
          icon={IconClipboardList}
          description="across all courses"
        />
        <StatCard
          title="Lessons Created"
          value="26"
          icon={IconNotebook}
          description="8 published this month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-0 px-2 pb-4">
            {recentActivity.map((a, i) => (
              <ActivityItem key={i} {...a} />
            ))}
          </CardContent>
        </Card>

        {/* My Courses Summary */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myCourses.map((course, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-gray-50/80 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{course.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {course.lessons} lessons · {course.students} students
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      course.status === "Published"
                        ? "text-green-700 border-green-200 bg-green-50"
                        : "text-gray-600 border-gray-200 bg-gray-50"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
