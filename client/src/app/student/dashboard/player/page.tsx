"use client"

import { PageHeader, EmptyState } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Badge } from "@/src/lib/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { Button } from "@/src/lib/components/ui/button"
import { IconPlayerPlay, IconCheck, IconLock } from "@tabler/icons-react"

const currentCourse = {
  title: "Advanced JavaScript",
  chapter: "Introduction to ES6+",
  lessons: [
    { title: "Arrow Functions & Template Literals", duration: "12 min", completed: true },
    { title: "Destructuring & Spread Operator", duration: "15 min", completed: true },
    { title: "Promises & Async/Await", duration: "20 min", completed: false, current: true },
  ],
  nextChapter: {
    title: "Advanced Patterns",
    lessons: [
      { title: "Closures Deep Dive", duration: "18 min", completed: false, locked: true },
      { title: "Prototype Chain", duration: "22 min", completed: false, locked: true },
    ],
  },
}

export default function CoursePlayerPage() {
  return (
    <>
      <PageHeader
        title="Course Player"
        description={`Currently viewing: ${currentCourse.title}`}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video / Content Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-900 rounded-t-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="size-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-3">
                    <IconPlayerPlay className="size-8 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">Promises & Async/Await</p>
                  <p className="text-white/60 text-xs mt-1">20 min · Advanced JavaScript</p>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">Promises & Async/Await</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Learn how to work with asynchronous JavaScript using Promises and the modern async/await syntax. 
                  This lesson covers creating promises, chaining, error handling, and practical patterns 
                  for real-world applications.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Button size="sm">
                    <IconCheck className="size-3.5" />
                    Mark as Complete
                  </Button>
                  <Button size="sm" variant="outline">
                    Next Lesson
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lesson Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{currentCourse.chapter}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-2">
              {currentCourse.lessons.map((lesson, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    lesson.current
                      ? "bg-green-50 text-green-800 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {lesson.completed ? (
                    <div className="size-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <IconCheck className="size-3 text-green-600" />
                    </div>
                  ) : (
                    <div className={`size-5 rounded-full border-2 shrink-0 ${
                      lesson.current ? "border-green-500" : "border-gray-200"
                    }`} />
                  )}
                  <span className="flex-1 truncate">{lesson.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">
                Next: {currentCourse.nextChapter.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-2">
              {currentCourse.nextChapter.lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground"
                >
                  <IconLock className="size-4 shrink-0" />
                  <span className="flex-1 truncate">{lesson.title}</span>
                  <span className="text-xs shrink-0">{lesson.duration}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
