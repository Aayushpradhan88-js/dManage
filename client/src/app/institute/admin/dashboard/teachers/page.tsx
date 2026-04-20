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

const teachers = [
  { id: 1, name: "Priya Thapa", email: "priya@mail.com", courses: 3, students: 45, status: "Active" },
  { id: 2, name: "Rajesh KC", email: "rajesh@mail.com", courses: 2, students: 32, status: "Active" },
  { id: 3, name: "Mina Basnet", email: "mina@mail.com", courses: 4, students: 58, status: "Active" },
  { id: 4, name: "Suman Adhikari", email: "suman@mail.com", courses: 1, students: 12, status: "On Leave" },
  { id: 5, name: "Kiran Poudel", email: "kiran@mail.com", courses: 2, students: 28, status: "Active" },
]

export default function TeachersPage() {
  return (
    <>
      <PageHeader
        title="Teachers"
        description="Manage your institute's teaching staff"
        actions={
          <Button size="sm">
            <IconPlus className="size-4" />
            Add Teacher
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
                <TableHead className="text-center">Courses</TableHead>
                <TableHead className="text-center">Students</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="text-muted-foreground">{t.email}</TableCell>
                  <TableCell className="text-center">{t.courses}</TableCell>
                  <TableCell className="text-center">{t.students}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        t.status === "Active"
                          ? "text-green-700 border-green-200 bg-green-50"
                          : "text-amber-700 border-amber-200 bg-amber-50"
                      }
                    >
                      {t.status}
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
