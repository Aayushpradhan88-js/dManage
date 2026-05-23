import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, CalendarDays, Mail, MapPin, Phone, UserRound } from "lucide-react"
import { getPublicInstituteDetail } from "@/src/features/platforms/services/platformsApi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/lib/components/ui/card"

type PlatformDetailPageProps = {
  params: Promise<{
    slug: string
    id: string
  }>
}

async function PlatformDetailPage({ params }: PlatformDetailPageProps) {
  const { id } = await params
  const institute = await getPublicInstituteDetail(id)

  if (!institute) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#ffffff_35%,_#ecfdf5_100%)]">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/platforms"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all platforms
        </Link>

        <div className="mt-8 rounded-[2rem] border border-emerald-100 bg-white/90 p-8 shadow-xl shadow-emerald-100/40">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
                Public institute profile
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {institute.name}
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {institute.description || "This institute is listed on dManage and has made its available courses visible for learners."}
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl bg-slate-50 p-6 text-sm text-slate-700 sm:min-w-[320px]">
              <div className="flex items-center gap-3">
                <UserRound className="h-4 w-4 text-emerald-600" />
                <span>Managed by {institute.ownerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>{institute.email || "Email not available"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>{institute.phone || "Phone not available"}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>{institute.address || "Address not available"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-emerald-600" />
                <span>
                  Joined {new Date(institute.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Course list</h2>
              <p className="mt-2 text-slate-600">
                Explore all published courses currently available from this institute.
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {institute.courses.length} courses
            </div>
          </div>

          {institute.courses.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white/80 px-6 py-14 text-center">
              <h3 className="text-xl font-semibold text-slate-900">No courses published yet</h3>
              <p className="mt-3 text-slate-600">
                This institute is visible now, but its course catalog has not been published yet.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {institute.courses.map((course) => (
                <Card key={course.id} className="border-slate-200 bg-white/95">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                        {course.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-slate-900">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-4 text-sm font-normal text-slate-600">
                        {course.description || "Course description will be shared by the institute soon."}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="font-medium text-slate-700">Price</span>
                      <span className="text-base font-semibold text-emerald-700">
                        NPR {course.price.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-emerald-600" />
                      <span>
                        Published {new Date(course.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default PlatformDetailPage
