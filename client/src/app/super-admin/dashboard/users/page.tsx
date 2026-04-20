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

const users = [
  { id: 1, name: "Aayush Pradhan", email: "aayush@dmanage.io", role: "Super Admin", institute: "—", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Priya Thapa", email: "priya@mail.com", role: "Teacher", institute: "Kathmandu Tech Academy", status: "Active", lastLogin: "1 hour ago" },
  { id: 3, name: "Aarav Sharma", email: "aarav@mail.com", role: "Student", institute: "Kathmandu Tech Academy", status: "Active", lastLogin: "3 hours ago" },
  { id: 4, name: "Santosh Thapa", email: "santosh@plh.edu", role: "Institute Admin", institute: "Pokhara Learning Hub", status: "Active", lastLogin: "5 hours ago" },
  { id: 5, name: "Kavita Shah", email: "kavita@bsc.edu", role: "Institute Admin", institute: "Biratnagar Skills Center", status: "Active", lastLogin: "1 day ago" },
  { id: 6, name: "Mina Basnet", email: "mina@mail.com", role: "Teacher", institute: "Kathmandu Tech Academy", status: "Active", lastLogin: "2 hours ago" },
  { id: 7, name: "Sita Rai", email: "sita@mail.com", role: "Student", institute: "Kathmandu Tech Academy", status: "Active", lastLogin: "6 hours ago" },
  { id: 8, name: "Ram Khadka", email: "ram@bilab.org", role: "Institute Admin", institute: "Bhaktapur Innovation Lab", status: "Pending", lastLogin: "—" },
]

function roleColor(role: string) {
  if (role === "Super Admin") return "text-purple-700 border-purple-200 bg-purple-50"
  if (role === "Institute Admin") return "text-blue-700 border-blue-200 bg-blue-50"
  if (role === "Teacher") return "text-green-700 border-green-200 bg-green-50"
  if (role === "Student") return "text-gray-700 border-gray-200 bg-gray-50"
  return ""
}

function statusColor(status: string) {
  if (status === "Active") return "text-green-700 border-green-200 bg-green-50"
  if (status === "Pending") return "text-amber-700 border-amber-200 bg-amber-50"
  return ""
}

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Users"
        description="All registered users across the platform"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={roleColor(u.role)}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.institute}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(u.status)}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-xs">
                    {u.lastLogin}
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
