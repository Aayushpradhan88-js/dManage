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
import { IconPlus, IconSpeakerphone } from "@tabler/icons-react"

const announcements = [
  {
    id: 1,
    title: "Exam Prep Guidelines",
    content: "Students enrolling in Advanced JavaScript should complete all chapter exercises before the mid-term exam on Feb 28.",
    createdAt: "Feb 10, 2026",
    course: "Advanced JavaScript",
  },
  {
    id: 2,
    title: "New Lesson Available",
    content: "A new lesson on Custom Hooks has been added to React Fundamentals. Please review it before next class.",
    createdAt: "Feb 8, 2026",
    course: "React Fundamentals",
  },
  {
    id: 3,
    title: "Office Hours Update",
    content: "Office hours will be moved from Wednesday to Thursday this week due to the teacher workshop.",
    createdAt: "Feb 5, 2026",
    course: "All Courses",
  },
]

export default function TeacherAnnouncementsPage() {
  return (
    <>
      <PageHeader
        title="Announcements"
        description="Post announcements for your students"
        actions={
          <Button size="sm">
            <IconPlus className="size-4" />
            New Announcement
          </Button>
        }
      />

      <div className="space-y-4">
        {announcements.map((a) => (
          <Card key={a.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <IconSpeakerphone className="size-4" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{a.title}</CardTitle>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{a.createdAt}</span>
                    <Badge variant="outline" className="text-xs">{a.course}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-[3.25rem]">
              <p className="text-sm text-muted-foreground leading-relaxed">{a.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
