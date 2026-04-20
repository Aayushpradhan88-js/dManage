"use client"

import {
  IconBook2,
  IconChartBar,
  IconClipboardList,
  IconPlayerPlay,
  IconCertificate,
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

const enrolledCourses = [
  { title: "Advanced JavaScript", teacher: "Priya Thapa", progress: 78, status: "In Progress" },
  { title: "Python for Data Science", teacher: "Mina Basnet", progress: 30, status: "In Progress" },
  { title: "Database Fundamentals", teacher: "Mina Basnet", progress: 100, status: "Completed" },
]

const recentActivity = [
  {
    title: "Lesson completed",
    description: "Finished 'Promises & Async/Await' in Advanced JavaScript",
    time: "1h ago",
    icon: IconPlayerPlay,
  },
  {
    title: "New enrollment",
    description: "Enrolled in Python for Data Science",
    time: "2d ago",
    icon: IconClipboardList,
  },
  {
    title: "Certificate earned",
    description: "Completed Database Fundamentals",
    time: "5d ago",
    icon: IconCertificate,
  },
  {
    title: "Announcement",
    description: "Spring term exam schedule released",
    time: "1w ago",
    icon: IconSpeakerphone,
  },
]

export default function StudentOverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Welcome back, Aarav"
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Enrolled Courses"
          value="3"
          icon={IconBook2}
          description="2 in progress, 1 completed"
        />
        <StatCard
          title="Overall Progress"
          value="69%"
          icon={IconChartBar}
          trend={{ value: "+5%", positive: true }}
          description="this week"
        />
        <StatCard
          title="Lessons Completed"
          value="18"
          icon={IconPlayerPlay}
          description="of 26 total"
        />
        <StatCard
          title="Certificates"
          value="1"
          icon={IconCertificate}
          description="Database Fundamentals"
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

        {/* My Courses */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {enrolledCourses.map((course, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{course.title}</p>
                    <p className="text-xs text-muted-foreground">
                      by {course.teacher}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Progress bar */}
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">
                        {course.progress}%
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        course.status === "Completed"
                          ? "text-green-700 border-green-200 bg-green-50"
                          : "text-blue-700 border-blue-200 bg-blue-50"
                      }
                    >
                      {course.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
