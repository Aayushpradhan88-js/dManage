"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Button } from "@/src/lib/components/ui/button"
import { Badge } from "@/src/lib/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { IconPlus, IconChevronRight, IconGripVertical } from "@tabler/icons-react"

const courseContent = [
  {
    course: "Advanced JavaScript",
    chapters: [
      {
        title: "Introduction to ES6+",
        lessons: [
          { title: "Arrow Functions & Template Literals", duration: "12 min", status: "Published" },
          { title: "Destructuring & Spread Operator", duration: "15 min", status: "Published" },
          { title: "Promises & Async/Await", duration: "20 min", status: "Published" },
        ],
      },
      {
        title: "Advanced Patterns",
        lessons: [
          { title: "Closures Deep Dive", duration: "18 min", status: "Published" },
          { title: "Prototype Chain", duration: "22 min", status: "Draft" },
          { title: "Design Patterns in JS", duration: "25 min", status: "Draft" },
        ],
      },
      {
        title: "Testing & Performance",
        lessons: [
          { title: "Unit Testing with Jest", duration: "16 min", status: "Published" },
          { title: "Performance Optimization", duration: "20 min", status: "Published" },
        ],
      },
    ],
  },
  {
    course: "React Fundamentals",
    chapters: [
      {
        title: "Getting Started",
        lessons: [
          { title: "What is React?", duration: "8 min", status: "Published" },
          { title: "JSX & Components", duration: "14 min", status: "Published" },
          { title: "Props & State", duration: "18 min", status: "Published" },
        ],
      },
      {
        title: "Hooks & Effects",
        lessons: [
          { title: "useState & useEffect", duration: "20 min", status: "Published" },
          { title: "Custom Hooks", duration: "15 min", status: "Published" },
          { title: "useContext & useReducer", duration: "22 min", status: "Draft" },
        ],
      },
    ],
  },
]

export default function LessonsPage() {
  return (
    <>
      <PageHeader
        title="Lessons"
        description="Manage chapter and lesson content across all courses"
        actions={
          <Button size="sm">
            <IconPlus className="size-4" />
            New Chapter
          </Button>
        }
      />

      <div className="space-y-6">
        {courseContent.map((course, ci) => (
          <Card key={ci}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{course.course}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.chapters.map((chapter, chi) => (
                <div key={chi} className="rounded-lg border bg-gray-50/50">
                  {/* Chapter header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b bg-white rounded-t-lg">
                    <IconGripVertical className="size-4 text-muted-foreground/40" />
                    <IconChevronRight className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{chapter.title}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {chapter.lessons.length} lessons
                    </Badge>
                  </div>
                  {/* Lessons list */}
                  <div className="divide-y">
                    {chapter.lessons.map((lesson, li) => (
                      <div
                        key={li}
                        className="flex items-center gap-3 px-4 py-2.5 pl-12 hover:bg-white/80 transition-colors"
                      >
                        <IconGripVertical className="size-3.5 text-muted-foreground/30" />
                        <span className="text-sm flex-1">{lesson.title}</span>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        <Badge
                          variant="outline"
                          className={
                            lesson.status === "Published"
                              ? "text-green-700 border-green-200 bg-green-50 text-xs"
                              : "text-gray-600 border-gray-200 bg-gray-50 text-xs"
                          }
                        >
                          {lesson.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
