"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Badge } from "@/src/lib/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { IconSpeakerphone } from "@tabler/icons-react"

const announcements = [
  {
    id: 1,
    title: "Spring Term Exam Schedule Released",
    content: "The examination schedule for the Spring 2026 term has been finalized. Please check your course pages for specific dates and instructions.",
    author: "Institute Admin",
    createdAt: "Feb 10, 2026",
    course: "All Courses",
    pinned: true,
  },
  {
    id: 2,
    title: "Exam Prep Guidelines",
    content: "Students enrolling in Advanced JavaScript should complete all chapter exercises before the mid-term exam on Feb 28.",
    author: "Priya Thapa",
    createdAt: "Feb 10, 2026",
    course: "Advanced JavaScript",
    pinned: false,
  },
  {
    id: 3,
    title: "New Course: UI/UX Design Principles",
    content: "We're excited to announce a new course on UI/UX Design Principles. Enrollment opens next week.",
    author: "Institute Admin",
    createdAt: "Feb 8, 2026",
    course: "All Courses",
    pinned: false,
  },
  {
    id: 4,
    title: "Holiday Schedule Update",
    content: "Classes will be suspended from Feb 25 to Feb 28 for the national holiday. Regular schedule resumes March 1.",
    author: "Institute Admin",
    createdAt: "Jan 28, 2026",
    course: "All Courses",
    pinned: false,
  },
]

export default function StudentAnnouncementsPage() {
  return (
    <>
      <PageHeader
        title="Announcements"
        description="Stay updated with institute and course news"
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
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{a.title}</CardTitle>
                    {a.pinned && <Badge className="text-xs">Pinned</Badge>}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{a.author}</span>
                    <span>·</span>
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
