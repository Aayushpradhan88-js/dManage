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

const enrollments = [
  { id: 1, student: "Aarav Sharma", course: "Advanced JavaScript", enrolledAt: "Jan 14, 2026", progress: "78%", status: "Active" },
  { id: 2, student: "Sita Rai", course: "React Fundamentals", enrolledAt: "Jan 10, 2026", progress: "92%", status: "Active" },
  { id: 3, student: "Deepak Bhatta", course: "Python for Data Science", enrolledAt: "Feb 1, 2026", progress: "61%", status: "Active" },
  { id: 4, student: "Rohan Shrestha", course: "Node.js Backend", enrolledAt: "Dec 15, 2025", progress: "88%", status: "Completed" },
  { id: 5, student: "Nisha Tamang", course: "Database Fundamentals", enrolledAt: "Feb 5, 2026", progress: "15%", status: "Active" },
  { id: 6, student: "Anita Lama", course: "Advanced JavaScript", enrolledAt: "Nov 20, 2025", progress: "45%", status: "Paused" },
  { id: 7, student: "Bikash Gurung", course: "React Fundamentals", enrolledAt: "Jan 16, 2026", progress: "0%", status: "Pending" },
  { id: 8, student: "Aarav Sharma", course: "Python for Data Science", enrolledAt: "Jan 20, 2026", progress: "30%", status: "Active" },
]

function statusColor(status: string) {
  if (status === "Active") return "text-green-700 border-green-200 bg-green-50"
  if (status === "Completed") return "text-blue-700 border-blue-200 bg-blue-50"
  if (status === "Pending") return "text-amber-700 border-amber-200 bg-amber-50"
  if (status === "Paused") return "text-gray-600 border-gray-200 bg-gray-50"
  return ""
}

export default function EnrollmentsPage() {
  return (
    <>
      <PageHeader
        title="Enrollments"
        description="Track all student-course enrollments"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead className="text-center">Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.student}</TableCell>
                  <TableCell>{e.course}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{e.enrolledAt}</TableCell>
                  <TableCell className="text-center">
                    <span className="inline-block min-w-[3rem]">{e.progress}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(e.status)}>
                      {e.status}
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
