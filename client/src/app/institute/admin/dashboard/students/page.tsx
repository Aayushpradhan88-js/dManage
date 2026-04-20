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

const students = [
  { id: 1, name: "Aarav Sharma", email: "aarav@mail.com", enrollments: 3, progress: "78%", status: "Active" },
  { id: 2, name: "Bikash Gurung", email: "bikash@mail.com", enrollments: 1, progress: "—", status: "Pending" },
  { id: 3, name: "Sita Rai", email: "sita@mail.com", enrollments: 2, progress: "92%", status: "Active" },
  { id: 4, name: "Anita Lama", email: "anita@mail.com", enrollments: 4, progress: "45%", status: "Inactive" },
  { id: 5, name: "Deepak Bhatta", email: "deepak@mail.com", enrollments: 2, progress: "61%", status: "Active" },
  { id: 6, name: "Nisha Tamang", email: "nisha@mail.com", enrollments: 1, progress: "15%", status: "Active" },
  { id: 7, name: "Rohan Shrestha", email: "rohan@mail.com", enrollments: 3, progress: "88%", status: "Active" },
]

function statusColor(status: string) {
  if (status === "Active") return "text-green-700 border-green-200 bg-green-50"
  if (status === "Pending") return "text-amber-700 border-amber-200 bg-amber-50"
  return "text-gray-600 border-gray-200 bg-gray-50"
}

export default function StudentsPage() {
  return (
    <>
      <PageHeader
        title="Students"
        description="Enrolled students across all courses"
        actions={
          <Button size="sm">
            <IconPlus className="size-4" />
            Add Student
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Enrollments</TableHead>
                <TableHead className="text-center">Avg Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.email}</TableCell>
                  <TableCell className="text-center">{s.enrollments}</TableCell>
                  <TableCell className="text-center">{s.progress}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(s.status)}>
                      {s.status}
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
