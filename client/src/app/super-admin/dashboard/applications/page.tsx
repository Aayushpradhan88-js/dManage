"use client"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Badge } from "@/src/lib/components/ui/badge"
import { Button } from "@/src/lib/components/ui/button"
import { Card, CardContent } from "@/src/lib/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table"

const applications = [
  {
    id: 1,
    instituteName: "Bhaktapur Innovation Lab",
    applicant: "Ram Khadka",
    email: "ram@bilab.org",
    plan: "Professional",
    submittedAt: "Feb 12, 2026",
    status: "Pending",
  },
  {
    id: 2,
    instituteName: "Butwal Tech School",
    applicant: "Srijana Gautam",
    email: "srijana@bts.edu",
    plan: "Starter",
    submittedAt: "Feb 11, 2026",
    status: "Pending",
  },
  {
    id: 3,
    instituteName: "Lalitpur Design School",
    applicant: "Anil Maharjan",
    email: "anil@lds.edu.np",
    plan: "Professional",
    submittedAt: "Feb 8, 2026",
    status: "Approved",
  },
  {
    id: 4,
    instituteName: "Chitwan Science Academy",
    applicant: "Sunita Chaudhary",
    email: "sunita@csa.org",
    plan: "Enterprise",
    submittedAt: "Feb 5, 2026",
    status: "Approved",
  },
  {
    id: 5,
    instituteName: "Janakpur Learning Center",
    applicant: "Mukesh Yadav",
    email: "mukesh@jlc.org",
    plan: "Starter",
    submittedAt: "Jan 30, 2026",
    status: "Rejected",
  },
]

function statusColor(status: string) {
  if (status === "Approved") return "text-green-700 border-green-200 bg-green-50"
  if (status === "Pending") return "text-amber-700 border-amber-200 bg-amber-50"
  if (status === "Rejected") return "text-red-700 border-red-200 bg-red-50"
  return ""
}

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="Institute Applications"
        description="Review and manage institute registration requests"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institute</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.instituteName}</TableCell>
                  <TableCell>{app.applicant}</TableCell>
                  <TableCell className="text-muted-foreground">{app.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {app.submittedAt}
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
