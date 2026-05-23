"use client"

import { useEffect, useMemo, useState } from "react"
import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Badge } from "@/src/lib/components/ui/badge"
import { Button } from "@/src/lib/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { Input } from "@/src/lib/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table"
import { APIWithToken } from "@/src/lib/store/global/API/apiCall"
import { useAppSelector } from "@/src/lib/store/hooks/customHook"

type ApplicationStatus = "pending" | "approved" | "rejected"

interface PlatformApplication {
  id: string
  name: string
  email: string
  phone: string
  address: string | null
  panNumber: string | null
  vatNumber: string | null
  status: ApplicationStatus
  rejectionReason: string | null
  createdAt: string
  reviewedBy: string | null
  approvedPlatformId: string | null
  user: {
    id: string
    username: string
    email: string
  }
  reviewer?: {
    id: string
    username: string
    email: string
  } | null
  approvedPlatform?: {
    id: string
    name: string
    slug: string
  } | null
}

interface ApplicationsApiResponse {
  data: PlatformApplication[]
  message: string
}

interface ApplicationUpdateApiResponse {
  data: PlatformApplication
  message: string
}

function statusColor(status: ApplicationStatus) {
  if (status === "approved") return "text-green-700 border-green-200 bg-green-50"
  if (status === "pending") return "text-amber-700 border-amber-200 bg-amber-50"
  if (status === "rejected") return "text-red-700 border-red-200 bg-red-50"
  return ""
}

function formatStatus(status: ApplicationStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export default function ApplicationsPage() {
  const authUser = useAppSelector((state) => state.auth.user)
  const [applications, setApplications] = useState<PlatformApplication[]>([])
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchApplications = async () => {
      if (!authUser.token) {
        setIsLoading(false)
        setErrorMessage("Please log in as super admin to review applications.")
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage("")

        const response = await APIWithToken.get<ApplicationsApiResponse>("/api/super-admin/applications")
        setApplications(response.data.data)
      } catch (error) {
        console.error("Failed to fetch platform applications", error)
        setErrorMessage("Unable to load platform applications right now.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [authUser.token])

  const selectedApplication = useMemo(
    () => applications.find((application) => application.id === selectedApplicationId) ?? null,
    [applications, selectedApplicationId]
  )

  const pendingApplications = applications.filter((application) => application.status === "pending")

  const handleReview = async (status: Extract<ApplicationStatus, "approved" | "rejected">) => {
    if (!selectedApplication) {
      return
    }

    if (status === "rejected" && !rejectionReason.trim()) {
      setErrorMessage("Rejection reason is required before rejecting an application.")
      return
    }

    try {
      setIsSubmitting(status)
      setErrorMessage("")

      const response = await APIWithToken.patch<ApplicationUpdateApiResponse>(
        `/api/super-admin/applications/${selectedApplication.id}/status`,
        {
          status,
          rejectionReason: rejectionReason.trim(),
        }
      )

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === selectedApplication.id
            ? {
                ...application,
                ...response.data.data,
                reviewer: authUser.username
                  ? {
                      id: authUser.id,
                      username: authUser.username,
                      email: authUser.email,
                    }
                  : application.reviewer,
              }
            : application
        )
      )
      setRejectionReason("")
    } catch (error) {
      console.error(`Failed to ${status} application`, error)
      setErrorMessage(`Unable to ${status} this application right now.`)
    } finally {
      setIsSubmitting(null)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Applications"
        description="Review incoming platform requests, approve qualified platforms, or reject with a required reason."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Application Queue</CardTitle>
            <CardDescription>
              {pendingApplications.length} pending review out of {applications.length} total applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="px-6 py-12 text-sm text-muted-foreground">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="px-6 py-12 text-sm text-muted-foreground">
                No platform applications have been submitted yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow
                      key={application.id}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedApplicationId(application.id)
                        setRejectionReason(application.rejectionReason ?? "")
                        setErrorMessage("")
                      }}
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{application.name}</p>
                          <p className="text-xs text-muted-foreground">{application.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{application.user.username}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColor(application.status)}>
                          {formatStatus(application.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {formatDate(application.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Review</CardTitle>
            <CardDescription>
              Select one application to inspect the submitted platform details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {!selectedApplication ? (
              <p className="text-sm text-muted-foreground">
                Pick an application from the left to open the approval panel.
              </p>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{selectedApplication.name}</h2>
                    <Badge variant="outline" className={statusColor(selectedApplication.status)}>
                      {formatStatus(selectedApplication.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submitted by {selectedApplication.user.username} on{" "}
                    {formatDate(selectedApplication.createdAt)}
                  </p>
                </div>

                <div className="grid gap-3 rounded-xl border p-4 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Applicant Email</p>
                    <p className="font-medium">{selectedApplication.user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Platform Email</p>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Address</p>
                    <p className="font-medium">{selectedApplication.address ?? "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">PAN Number</p>
                    <p className="font-medium">{selectedApplication.panNumber ?? "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">VAT Number</p>
                    <p className="font-medium">{selectedApplication.vatNumber ?? "Not provided"}</p>
                  </div>
                </div>

                {selectedApplication.status === "rejected" ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="font-medium">Rejection reason</p>
                    <p className="mt-1">{selectedApplication.rejectionReason}</p>
                  </div>
                ) : null}

                {selectedApplication.status === "approved" ? (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    <p className="font-medium">Approved platform</p>
                    <p className="mt-1">
                      {selectedApplication.approvedPlatform?.name ?? "Platform created successfully"}
                    </p>
                  </div>
                ) : null}

                {selectedApplication.status === "pending" ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label
                        htmlFor="rejectionReason"
                        className="text-sm font-medium text-foreground"
                      >
                        Rejection reason
                      </label>
                      <Input
                        id="rejectionReason"
                        value={rejectionReason}
                        onChange={(event) => setRejectionReason(event.target.value)}
                        placeholder="Required only if you reject this application"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => handleReview("approved")}
                        disabled={Boolean(isSubmitting)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        {isSubmitting === "approved" ? "Approving..." : "Approve"}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReview("rejected")}
                        disabled={Boolean(isSubmitting)}
                      >
                        {isSubmitting === "rejected" ? "Rejecting..." : "Reject"}
                      </Button>
                    </div>
                  </div>
                ) : null}

                {errorMessage ? (
                  <p className="text-sm font-medium text-red-600">{errorMessage}</p>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
