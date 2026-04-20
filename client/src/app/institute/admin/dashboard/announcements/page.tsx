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
    title: "Spring Term Exam Schedule Released",
    content: "The examination schedule for the Spring 2026 term has been finalized. Please check your course pages for specific dates and instructions.",
    author: "Admin",
    createdAt: "Feb 10, 2026",
    audience: "All",
    pinned: true,
  },
  {
    id: 2,
    title: "New Course: UI/UX Design Principles",
    content: "We're excited to announce a new course on UI/UX Design Principles taught by Priya Thapa. Enrollment opens next week.",
    author: "Admin",
    createdAt: "Feb 8, 2026",
    audience: "Students",
    pinned: false,
  },
  {
    id: 3,
    title: "Teacher Workshop: Modern Pedagogy",
    content: "All teachers are invited to an interactive workshop on modern pedagogical techniques. Session scheduled for Feb 20, 2026.",
    author: "Admin",
    createdAt: "Feb 5, 2026",
    audience: "Teachers",
    pinned: false,
  },
  {
    id: 4,
    title: "System Maintenance Notice",
    content: "The platform will undergo scheduled maintenance on Feb 15, 2026 from 2:00 AM to 4:00 AM NST. Please save your work.",
    author: "Admin",
    createdAt: "Feb 3, 2026",
    audience: "All",
    pinned: false,
  },
  {
    id: 5,
    title: "Holiday Schedule Update",
    content: "Classes will be suspended from Feb 25 to Feb 28 for the national holiday. Regular schedule resumes March 1.",
    author: "Admin",
    createdAt: "Jan 28, 2026",
    audience: "All",
    pinned: false,
  },
]

function audienceColor(audience: string) {
  if (audience === "All") return "text-blue-700 border-blue-200 bg-blue-50"
  if (audience === "Students") return "text-green-700 border-green-200 bg-green-50"
  if (audience === "Teachers") return "text-purple-700 border-purple-200 bg-purple-50"
  return ""
}

export default function AnnouncementsPage() {
  return (
    <>
      <PageHeader
        title="Announcements"
        description="Communicate with your institute community"
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
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{a.title}</CardTitle>
                    {a.pinned && (
                      <Badge className="text-xs">Pinned</Badge>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{a.author}</span>
                    <span>·</span>
                    <span>{a.createdAt}</span>
                    <Badge variant="outline" className={`text-xs ${audienceColor(a.audience)}`}>
                      {a.audience}
                    </Badge>
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
