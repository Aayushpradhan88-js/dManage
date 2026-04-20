"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Badge } from "@/src/lib/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { Button } from "@/src/lib/components/ui/button"
import { IconPlayerPlay } from "@tabler/icons-react"

const courses = [
  {
    id: 1,
    title: "Advanced JavaScript",
    teacher: "Priya Thapa",
    progress: 78,
    completedLessons: 6,
    totalLessons: 8,
    status: "In Progress",
    nextLesson: "Prototype Chain",
  },
  {
    id: 2,
    title: "Python for Data Science",
    teacher: "Mina Basnet",
    progress: 30,
    completedLessons: 5,
    totalLessons: 15,
    status: "In Progress",
    nextLesson: "Working with Pandas",
  },
  {
    id: 3,
    title: "Database Fundamentals",
    teacher: "Mina Basnet",
    progress: 100,
    completedLessons: 9,
    totalLessons: 9,
    status: "Completed",
    nextLesson: null,
  },
]

export default function StudentCoursesPage() {
  return (
    <>
      <PageHeader
        title="My Courses"
        description="Courses you are enrolled in"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{course.title}</CardTitle>
                <Badge
                  variant="outline"
                  className={
                    course.status === "Completed"
                      ? "text-green-700 border-green-200 bg-green-50 text-xs"
                      : "text-blue-700 border-blue-200 bg-blue-50 text-xs"
                  }
                >
                  {course.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">by {course.teacher}</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-4">
              <div>
                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </p>
              </div>

              {course.nextLesson && (
                <Button size="sm" variant="outline" className="w-full">
                  <IconPlayerPlay className="size-3.5" />
                  Continue: {course.nextLesson}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
