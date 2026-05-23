import Link from "next/link"
import { Building2, CalendarDays, ChevronRight, Mail, MapPin, Phone } from "lucide-react"
import { getPublicInstitutes } from "@/src/features/platforms/services/platformsApi"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/lib/components/ui/card"

async function FindPlatform() {
  const institutes = await getPublicInstitutes()

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfdf5,_#ffffff_45%,_#f8fafc)]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
            Find Platforms
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Explore registered institutes and browse their courses
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Pick any approved institute to view its live course catalog, contact details, and platform identity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {institutes.map((institute) => (
            <Link
              key={institute.id}
              href={`/platforms/${institute.slug}/${institute.id}`}
              className="group h-full"
            >
              <Card className="h-full border-slate-200 bg-white/90 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      {institute.courseCount} courses
                    </span>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-slate-900">{institute.name}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm font-normal text-slate-600">
                      {institute.description || "Approved on dManage and ready for learners to explore."}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    <span className="truncate">{institute.email || "Email not available"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>{institute.phone || "Phone not available"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <span className="line-clamp-2">{institute.address || "Address not available"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-emerald-600" />
                    <span>
                      Joined {new Date(institute.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-sm font-medium text-slate-700">
                    Managed by {institute.ownerName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    View courses
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {institutes.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white/80 px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">No institutes are public yet</h2>
            <p className="mt-3 text-slate-600">
              Once institutes are approved and publish courses, they will appear here automatically.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default FindPlatform
