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

const orders = [
  {
    id: "ORD-2026001",
    course: "Advanced JavaScript",
    amount: "$49.00",
    date: "Jan 14, 2026",
    status: "Completed",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "ORD-2026002",
    course: "Python for Data Science",
    amount: "$59.00",
    date: "Jan 20, 2026",
    status: "Completed",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "ORD-2025089",
    course: "Database Fundamentals",
    amount: "Free",
    date: "Oct 5, 2025",
    status: "Completed",
    paymentMethod: "—",
  },
]

function statusColor(status: string) {
  if (status === "Completed") return "text-green-700 border-green-200 bg-green-50"
  if (status === "Pending") return "text-amber-700 border-amber-200 bg-amber-50"
  if (status === "Refunded") return "text-red-700 border-red-200 bg-red-50"
  return ""
}

export default function OrdersPage() {
  return (
    <>
      <PageHeader
        title="Orders"
        description="Your course purchase history"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.course}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {order.date}
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
