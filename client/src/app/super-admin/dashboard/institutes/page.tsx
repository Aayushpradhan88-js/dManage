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

const institutes = [
  { id: 1, name: "Kathmandu Tech Academy", plan: "Professional", admin: "Aayush Pradhan", users: 248, courses: 14, status: "Active", createdAt: "Jan 5, 2026" },
  { id: 2, name: "Pokhara Learning Hub", plan: "Starter", admin: "Santosh Thapa", users: 42, courses: 4, status: "Active", createdAt: "Jan 12, 2026" },
  { id: 3, name: "Biratnagar Skills Center", plan: "Enterprise", admin: "Kavita Shah", users: 510, courses: 32, status: "Active", createdAt: "Dec 1, 2025" },
  { id: 4, name: "Lalitpur Design School", plan: "Professional", admin: "Anil Maharjan", users: 95, courses: 8, status: "Active", createdAt: "Feb 8, 2026" },
  { id: 5, name: "Chitwan Science Academy", plan: "Enterprise", admin: "Sunita Chaudhary", users: 320, courses: 18, status: "Active", createdAt: "Feb 5, 2026" },
]

export default function InstitutesPage() {
  return (
    <>
      <PageHeader
        title="Institutes"
        description="All registered institutes on the platform"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-center">Users</TableHead>
                <TableHead className="text-center">Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {institutes.map((inst) => (
                <TableRow key={inst.id}>
                  <TableCell className="font-medium">{inst.name}</TableCell>
                  <TableCell className="text-muted-foreground">{inst.admin}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{inst.plan}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{inst.users}</TableCell>
                  <TableCell className="text-center">{inst.courses}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                      {inst.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {inst.createdAt}
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
