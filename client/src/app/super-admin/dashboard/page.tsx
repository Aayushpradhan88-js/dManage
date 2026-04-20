"use client"

import {
  IconBuildingCommunity,
  IconUsers,
  IconFileText,
  IconUserPlus,
  IconShieldCheck,
  IconBuildingSkyscraper,
} from "@tabler/icons-react"
import {
  StatCard,
  PageHeader,
  ActivityItem,
} from "@/src/lib/components/dashboard/dashboard-primitives"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { Badge } from "@/src/lib/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table"

const recentInstitutes = [
  { name: "Kathmandu Tech Academy", plan: "Professional", users: 248, status: "Active", createdAt: "Jan 5, 2026" },
  { name: "Pokhara Learning Hub", plan: "Starter", users: 42, status: "Active", createdAt: "Jan 12, 2026" },
  { name: "Biratnagar Skills Center", plan: "Enterprise", users: 510, status: "Active", createdAt: "Dec 1, 2025" },
  { name: "Lalitpur Design School", plan: "Professional", users: 95, status: "Pending", createdAt: "Feb 8, 2026" },
]

const recentActivity = [
  {
    title: "New application",
    description: "Bhaktapur Innovation Lab applied for institute status",
    time: "1h ago",
    icon: IconFileText,
  },
  {
    title: "Institute approved",
    description: "Lalitpur Design School is now active",
    time: "3h ago",
    icon: IconShieldCheck,
  },
  {
    title: "New user signup",
    description: "15 new users across all institutes today",
    time: "6h ago",
    icon: IconUserPlus,
  },
  {
    title: "Plan upgrade",
    description: "Pokhara Learning Hub upgraded to Professional",
    time: "1d ago",
    icon: IconBuildingSkyscraper,
  },
]

export default function SuperAdminOverviewPage() {
  return (
    <>
      <PageHeader
        title="Platform Overview"
        description="System-wide metrics and activity"
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Institutes"
          value="47"
          icon={IconBuildingCommunity}
          trend={{ value: "+3", positive: true }}
          description="this month"
        />
        <StatCard
          title="Total Users"
          value="4,892"
          icon={IconUsers}
          trend={{ value: "+12%", positive: true }}
          description="from last month"
        />
        <StatCard
          title="Pending Applications"
          value="5"
          icon={IconFileText}
          description="awaiting review"
        />
        <StatCard
          title="Active Subscriptions"
          value="42"
          icon={IconShieldCheck}
          description="across all plans"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-0 px-2 pb-4">
            {recentActivity.map((a, i) => (
              <ActivityItem key={i} {...a} />
            ))}
          </CardContent>
        </Card>

        {/* Recent Institutes */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent Institutes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-center">Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInstitutes.map((inst, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{inst.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{inst.plan}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{inst.users}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          inst.status === "Active"
                            ? "text-green-700 border-green-200 bg-green-50"
                            : "text-amber-700 border-amber-200 bg-amber-50"
                        }
                      >
                        {inst.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">
                      {inst.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
