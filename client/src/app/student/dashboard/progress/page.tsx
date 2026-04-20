"use client"

import { PageHeader, StatCard } from "@/src/lib/components/dashboard/dashboard-primitives"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { Badge } from "@/src/lib/components/ui/badge"
import { IconBook2, IconChartBar, IconClock, IconCertificate } from "@tabler/icons-react"

const courseProgress = [
  {
    title: "Advanced JavaScript",
    completedLessons: 6,
    totalLessons: 8,
    progress: 78,
    timeSpent: "12h 30m",
    grade: "A-",
  },
  {
    title: "Python for Data Science",
    completedLessons: 5,
    totalLessons: 15,
    progress: 30,
    timeSpent: "6h 15m",
    grade: "B+",
  },
  {
    title: "Database Fundamentals",
    completedLessons: 9,
    totalLessons: 9,
    progress: 100,
    timeSpent: "15h 45m",
    grade: "A",
  },
]

export default function ProgressPage() {
  return (
    <>
      <PageHeader
        title="Progress"
        description="Track your learning journey"
      />

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Courses Enrolled"
          value="3"
          icon={IconBook2}
        />
        <StatCard
          title="Overall Progress"
          value="69%"
          icon={IconChartBar}
          trend={{ value: "+5%", positive: true }}
        />
        <StatCard
          title="Total Time"
          value="34h 30m"
          icon={IconClock}
        />
        <StatCard
          title="Certificates"
          value="1"
          icon={IconCertificate}
        />
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {courseProgress.map((course, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{course.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {course.completedLessons}/{course.totalLessons} lessons · {course.timeSpent}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Grade: {course.grade}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      course.progress === 100
                        ? "text-green-700 border-green-200 bg-green-50 text-xs"
                        : "text-blue-700 border-blue-200 bg-blue-50 text-xs"
                    }
                  >
                    {course.progress === 100 ? "Completed" : `${course.progress}%`}
                  </Badge>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    course.progress === 100 ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
