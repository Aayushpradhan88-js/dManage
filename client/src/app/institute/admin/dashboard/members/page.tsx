"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Button } from "@/src/lib/components/ui/button"
import { Badge } from "@/src/lib/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/src/lib/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table"
import { IconPlus } from "@tabler/icons-react"

const members = [
  { id: 1, name: "Aarav Sharma", email: "aarav@mail.com", role: "Student", status: "Active", joined: "Jan 12, 2026" },
  { id: 2, name: "Priya Thapa", email: "priya@mail.com", role: "Teacher", status: "Active", joined: "Jan 8, 2026" },
  { id: 3, name: "Bikash Gurung", email: "bikash@mail.com", role: "Student", status: "Pending", joined: "Jan 15, 2026" },
  { id: 4, name: "Sita Rai", email: "sita@mail.com", role: "Student", status: "Active", joined: "Dec 20, 2025" },
  { id: 5, name: "Rajesh KC", email: "rajesh@mail.com", role: "Teacher", status: "Active", joined: "Nov 5, 2025" },
  { id: 6, name: "Anita Lama", email: "anita@mail.com", role: "Student", status: "Inactive", joined: "Oct 18, 2025" },
  { id: 7, name: "Deepak Bhatta", email: "deepak@mail.com", role: "Student", status: "Active", joined: "Feb 1, 2026" },
  { id: 8, name: "Mina Basnet", email: "mina@mail.com", role: "Teacher", status: "Active", joined: "Jan 22, 2026" },
]

function statusColor(status: string) {
  if (status === "Active") return "text-green-700 border-green-200 bg-green-50"
  if (status === "Pending") return "text-amber-700 border-amber-200 bg-amber-50"
  return "text-gray-600 border-gray-200 bg-gray-50"
}

export default function MembersPage() {
  return (
    <>
      <PageHeader
        title="Members"
        description="All institute memberships across roles"
        actions={
          <Button size="sm">
            <IconPlus className="size-4" />
            Invite Member
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
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-muted-foreground">{m.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{m.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(m.status)}>
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {m.joined}
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
