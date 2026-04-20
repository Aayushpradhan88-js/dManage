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

const students = [
  { id: 1, name: "Aarav Sharma", email: "aarav@mail.com", course: "Advanced JavaScript", progress: "78%", lastActive: "2 hours ago" },
  { id: 2, name: "Sita Rai", email: "sita@mail.com", course: "React Fundamentals", progress: "92%", lastActive: "1 hour ago" },
  { id: 3, name: "Deepak Bhatta", email: "deepak@mail.com", course: "Advanced JavaScript", progress: "61%", lastActive: "5 hours ago" },
  { id: 4, name: "Nisha Tamang", email: "nisha@mail.com", course: "Advanced JavaScript", progress: "45%", lastActive: "1 day ago" },
  { id: 5, name: "Rohan Shrestha", email: "rohan@mail.com", course: "React Fundamentals", progress: "88%", lastActive: "3 hours ago" },
  { id: 6, name: "Anita Lama", email: "anita@mail.com", course: "Advanced JavaScript", progress: "30%", lastActive: "3 days ago" },
]

export default function TeacherStudentsPage() {
  return (
    <>
      <PageHeader
        title="Students"
        description="Students enrolled in your courses"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-center">Progress</TableHead>
                <TableHead className="text-right">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{s.course}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{s.progress}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-xs">
                    {s.lastActive}
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
