"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Button } from "@/src/lib/components/ui/button"
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
import { IconPlus } from "@tabler/icons-react"

const courses = [
  { id: 1, title: "Advanced JavaScript", teacher: "Priya Thapa", students: 24, chapters: 8, status: "Published", price: "$49" },
  { id: 2, title: "React Fundamentals", teacher: "Rajesh KC", students: 18, chapters: 12, status: "Published", price: "$39" },
  { id: 3, title: "Python for Data Science", teacher: "Mina Basnet", students: 32, chapters: 15, status: "Published", price: "$59" },
  { id: 4, title: "UI/UX Design Principles", teacher: "Priya Thapa", students: 0, chapters: 6, status: "Draft", price: "$29" },
  { id: 5, title: "Node.js Backend", teacher: "Kiran Poudel", students: 14, chapters: 10, status: "Published", price: "$45" },
  { id: 6, title: "Database Fundamentals", teacher: "Mina Basnet", students: 26, chapters: 9, status: "Published", price: "Free" },
]

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Courses"
        description="All courses offered by your institute"
        actions={
          <Button size="sm">
            <IconPlus className="size-4" />
            Create Course
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead className="text-center">Chapters</TableHead>
                <TableHead className="text-center">Students</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell className="text-muted-foreground">{c.teacher}</TableCell>
                  <TableCell className="text-center">{c.chapters}</TableCell>
                  <TableCell className="text-center">{c.students}</TableCell>
                  <TableCell>{c.price}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
