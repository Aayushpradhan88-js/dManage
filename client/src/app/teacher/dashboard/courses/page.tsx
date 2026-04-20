"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Badge } from "@/src/lib/components/ui/badge"
import { Card, CardContent } from "@/src/lib/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table"
import { Button } from "@/src/lib/components/ui/button"
import { IconPlus } from "@tabler/icons-react"

const courses = [
  { id: 1, title: "Advanced JavaScript", students: 24, chapters: 3, lessons: 8, status: "Published", lastUpdated: "Feb 10, 2026" },
  { id: 2, title: "React Fundamentals", students: 18, chapters: 2, lessons: 6, status: "Published", lastUpdated: "Feb 8, 2026" },
  { id: 3, title: "UI/UX Design Principles", students: 0, chapters: 2, lessons: 6, status: "Draft", lastUpdated: "Feb 12, 2026" },
]

export default function TeacherCoursesPage() {
  return (
    <>
      <PageHeader
        title="My Courses"
        description="Courses you are teaching"
        actions={
          <Button size="sm">
            <IconPlus className="size-4" />
            New Course
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="text-center">Chapters</TableHead>
                <TableHead className="text-center">Lessons</TableHead>
                <TableHead className="text-center">Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell className="text-center">{c.chapters}</TableCell>
                  <TableCell className="text-center">{c.lessons}</TableCell>
                  <TableCell className="text-center">{c.students}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        c.status === "Published"
                          ? "text-green-700 border-green-200 bg-green-50"
                          : "text-gray-600 border-gray-200 bg-gray-50"
                      }
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {c.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
