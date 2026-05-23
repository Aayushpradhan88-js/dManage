"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/src/lib/components/ui/badge"
import { Button } from "@/src/lib/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card"
import { APIWithToken } from "@/src/lib/store/global/API/apiCall"
import { useAppSelector } from "@/src/lib/store/hooks/customHook"

type ApplicationStatus = "pending" | "approved" | "rejected"

interface MyInstituteApplication {
  id: string
  name: string
  email: string
  phone: string
  address: string | null
  status: ApplicationStatus
  rejectionReason: string | null
  createdAt: string
  approvedPlatform?: {
    id: string
    name: string
    slug: string
  } | null
}

interface MyApplicationApiResponse {
  data: MyInstituteApplication | null
  message: string
}

function statusColor(status: ApplicationStatus) {
  if (status === "approved") return "text-green-700 border-green-200 bg-green-50"
  if (status === "pending") return "text-amber-700 border-amber-200 bg-amber-50"
  return "text-red-700 border-red-200 bg-red-50"
}

export default function InstituteApplicationStatusPage() {
  const router = useRouter()
  const authUser = useAppSelector((state) => state.auth.user)
  const [application, setApplication] = useState<MyInstituteApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchApplication = async () => {
      if (!authUser.token) {
        router.push("/login")
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage("")
        const response = await APIWithToken.get<MyApplicationApiResponse>("/api/platform/my-application")
        setApplication(response.data.data)
      } catch (error) {
        console.error("Failed to load platform application", error)
        setErrorMessage("Unable to load your platform application status right now.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplication()
  }, [authUser.token, router])

  const statusCopy = useMemo(() => {
    if (!application) {
      return {
        title: "No application found",
        description: "You have not submitted a platform application yet.",
      }
    }

    if (application.status === "pending") {
      return {
        title: "Your application is under review",
        description: "You currently have limited access while the super admin reviews your platform details.",
      }
    }

    if (application.status === "approved") {
      return {
        title: "Your platform is approved",
        description: "Your account now has platform admin access. Continue to the dashboard after login.",
      }
    }

    return {
      title: "Your application was rejected",
      description: "Please review the rejection reason below before you submit again.",
    }
  }, [application])

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Application Status</CardTitle>
            <CardDescription>
              Before approval, this is the only platform area available to the user account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading application status...</p>
            ) : errorMessage ? (
              <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            ) : !application ? (
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-semibold">{statusCopy.title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{statusCopy.description}</p>
                </div>
                <Button asChild>
                  <Link href="/platform/apply">Submit platform application</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-xl font-semibold">{statusCopy.title}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{statusCopy.description}</p>
                  </div>
                  <Badge variant="outline" className={statusColor(application.status)}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid gap-4 rounded-xl border bg-white p-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Platform Name</p>
                    <p className="mt-1 font-medium">{application.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Platform Email</p>
                    <p className="mt-1 font-medium">{application.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
                    <p className="mt-1 font-medium">{application.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Address</p>
                    <p className="mt-1 font-medium">{application.address ?? "Not provided"}</p>
                  </div>
                </div>

                {application.status === "rejected" && application.rejectionReason ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="font-medium">Rejection reason</p>
                    <p className="mt-1">{application.rejectionReason}</p>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  {application.status === "approved" ? (
                    <Button asChild>
                      <Link href="/platform/admin/dashboard">Go to platform dashboard</Link>
                    </Button>
                  ) : null}
                  {application.status === "rejected" ? (
                    <Button asChild variant="outline">
                      <Link href="/platform/apply">Submit a new application</Link>
                    </Button>
                  ) : null}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
