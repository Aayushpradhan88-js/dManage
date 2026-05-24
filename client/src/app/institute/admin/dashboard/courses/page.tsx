"use client"

import { useEffect, useMemo, useState } from "react"
import {
  IconBook2,
  IconLoader2,
  IconPlus,
  IconSearch,
  IconSparkles,
  IconX,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { PageHeader } from "@/src/lib/components/dashboard/dashboard-primitives"
import { Badge } from "@/src/lib/components/ui/badge"
import { Button } from "@/src/lib/components/ui/button"
import { Card, CardContent } from "@/src/lib/components/ui/card"
import { Checkbox } from "@/src/lib/components/ui/checkbox"
import { Input } from "@/src/lib/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/lib/components/ui/select"
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

type CourseStatus = "draft" | "published" | "archived"
type CourseLevel = "beginner" | "intermediate" | "advanced"

type TeacherOption = {
  id: string
  role: string
  username: string
  email: string
}

type CourseRecord = {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnailUrl: string | null
  previewVideoUrl: string | null
  difficultyLevel: CourseLevel
  totalDurationSeconds: number | null
  isFree: boolean
  price: number
  status: CourseStatus
  teachers: Array<{
    id: string
    role: string
    user: {
      id: string
      username: string
      email: string
    }
  }>
  chaptersCount: number
  studentsCount: number
}

type CourseFormState = {
  title: string
  slug: string
  description: string
  thumbnailUrl: string
  previewVideoUrl: string
  difficultyLevel: CourseLevel
  totalDurationSeconds: string
  isFree: boolean
  price: string
  status: "draft" | "published"
  teacherIds: string[]
}

type CourseListResponse = {
  data: CourseRecord[]
  message: string
}

type TeacherOptionsResponse = {
  data: TeacherOption[]
  message: string
}

type CreateCourseResponse = {
  data: CourseRecord
  message: string
  meta?: {
    requestedTeacherCount: number
    assignedTeacherCount: number
  }
}

const emptyForm: CourseFormState = {
  title: "",
  slug: "",
  description: "",
  thumbnailUrl: "",
  previewVideoUrl: "",
  difficultyLevel: "beginner",
  totalDurationSeconds: "",
  isFree: false,
  price: "",
  status: "draft",
  teacherIds: [],
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function formatDuration(totalSeconds: number | null) {
  if (!totalSeconds) {
    return "0h"
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (!hours) {
    return `${minutes}m`
  }

  if (!minutes) {
    return `${hours}h`
  }

  return `${hours}h ${minutes}m`
}

function formatPrice(course: CourseRecord) {
  if (course.isFree || course.price === 0) {
    return "Free"
  }

  return `$${course.price}`
}

function statusBadgeClass(status: CourseStatus) {
  if (status === "published") {
    return "border-green-200 bg-green-50 text-green-700"
  }

  if (status === "draft") {
    return "border-slate-200 bg-slate-50 text-slate-700"
  }

  return "border-amber-200 bg-amber-50 text-amber-700"
}

export default function CoursesPage() {
  const authUser = useAppSelector((state) => state.auth.user)
  const [courses, setCourses] = useState<CourseRecord[]>([])
  const [teacherOptions, setTeacherOptions] = useState<TeacherOption[]>([])
  const [search, setSearch] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [slugTouched, setSlugTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState<CourseFormState>(emptyForm)

  useEffect(() => {
    const loadData = async () => {
      if (!authUser.token) {
        return
      }

      try {
        setIsLoading(true)
        const [coursesResponse, teachersResponse] = await Promise.all([
          APIWithToken.get<CourseListResponse>("/api/institute/course"),
          APIWithToken.get<TeacherOptionsResponse>("/api/institute/course/teacher-options"),
        ])

        setCourses(coursesResponse.data.data ?? [])
        setTeacherOptions(teachersResponse.data.data ?? [])
      } catch (error) {
        console.error("Failed to load courses", error)
        toast.error("Unable to load courses right now")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [authUser.token])

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return courses
    }

    return courses.filter((course) => {
      const teachers = course.teachers
        .map((teacher) => teacher.user.username)
        .join(" ")

      return [course.title, course.slug, course.description ?? "", teachers].some((value) =>
        value.toLowerCase().includes(query)
      )
    })
  }, [courses, search])

  const totalCourses = courses.length
  const publishedCourses = courses.filter((course) => course.status === "published").length
  const draftCourses = courses.filter((course) => course.status === "draft").length

  const handleOpenCreate = () => {
    setForm(emptyForm)
    setSlugTouched(false)
    setIsCreateOpen(true)
  }

  const handleCloseCreate = () => {
    setIsCreateOpen(false)
    setForm(emptyForm)
    setSlugTouched(false)
  }

  const handleTitleChange = (value: string) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched ? current.slug : slugify(value),
    }))
  }

  const handleTeacherToggle = (teacherId: string, checked: boolean) => {
    setForm((current) => ({
      ...current,
      teacherIds: checked
        ? [...current.teacherIds, teacherId]
        : current.teacherIds.filter((id) => id !== teacherId),
    }))
  }

  const handleSubmit = async () => {
    const title = form.title.trim()
    const slug = form.slug.trim()
    const description = form.description.trim()

    if (!title || !slug || !description) {
      toast.error("Please fill in the required course details")
      return
    }

    try {
      setIsSaving(true)

      const response = await APIWithToken.post<CreateCourseResponse>("/api/institute/course", {
        title,
        slug,
        description,
        thumbnailUrl: form.thumbnailUrl.trim(),
        previewVideoUrl: form.previewVideoUrl.trim(),
        difficultyLevel: form.difficultyLevel,
        totalDurationSeconds: form.totalDurationSeconds ? Number(form.totalDurationSeconds) : 0,
        isFree: form.isFree,
        price: form.isFree ? 0 : Number(form.price || 0),
        status: form.status,
        teacherIds: form.teacherIds,
      })

      setCourses((current) => [response.data.data, ...current])
      handleCloseCreate()

      if (response.data.meta && response.data.meta.requestedTeacherCount > response.data.meta.assignedTeacherCount) {
        toast.success("Course created", {
          description: `Saved to database. Assigned ${response.data.meta.assignedTeacherCount} of ${response.data.meta.requestedTeacherCount} selected teachers.`,
        })
      } else {
        toast.success("Course created and saved to database")
      }
    } catch (error) {
      console.error("Failed to create course", error)
      toast.error("Course could not be created")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Courses"
        description="Create courses from the new Prisma-ready structure. Chapters can be added after the base course is created."
        actions={
          <Button onClick={handleOpenCreate} className="bg-green-600 text-white hover:bg-green-700">
            <IconPlus className="size-4" />
            Create Course
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 bg-white">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="text-sm text-slate-500">Total courses</p>
              <p className="mt-1 text-3xl font-semibold text-slate-950">{totalCourses}</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-3 text-green-700">
              <IconBook2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="text-sm text-slate-500">Published</p>
              <p className="mt-1 text-3xl font-semibold text-slate-950">{publishedCourses}</p>
            </div>
            <Badge variant="outline" className="border-green-200 bg-green-50 px-3 py-1 text-green-700">
              Live
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="text-sm text-slate-500">Drafts</p>
              <p className="mt-1 text-3xl font-semibold text-slate-950">{draftCourses}</p>
            </div>
            <Badge variant="outline" className="border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
              Pending
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardContent className="space-y-5 p-0">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Course library</h2>
              <p className="text-sm text-slate-500">Browse published and draft courses for this platform.</p>
            </div>

            <div className="relative w-full max-w-sm">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title, slug, teacher..."
                className="border-slate-200 bg-white pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Teachers</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-center">Chapters</TableHead>
                  <TableHead className="text-center">Students</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-slate-500">
                      Loading courses...
                    </TableCell>
                  </TableRow>
                ) : filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-slate-500">
                      No courses found yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="min-w-[240px]">
                        <div className="space-y-1">
                          <p className="font-medium text-slate-950">{course.title}</p>
                          <p className="text-xs text-slate-500">/{course.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {course.teachers.length > 0
                          ? course.teachers.map((teacher) => teacher.user.username).join(", ")
                          : "Unassigned"}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {formatDuration(course.totalDurationSeconds)}
                      </TableCell>
                      <TableCell className="text-center">{course.chaptersCount}</TableCell>
                      <TableCell className="text-center">{course.studentsCount}</TableCell>
                      <TableCell>{formatPrice(course)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadgeClass(course.status)}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {isCreateOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/30 px-4 py-8 backdrop-blur-[2px]">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <IconSparkles className="size-3.5" />
                  Prisma-aligned setup
                </div>
                <h2 className="text-2xl font-semibold text-slate-950">Create course</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Start with the base course details now. Chapters and lessons can be added later.
                </p>
              </div>

              <Button variant="ghost" size="icon" onClick={handleCloseCreate} className="rounded-full">
                <IconX className="size-4" />
              </Button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="space-y-5 px-6 py-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-800">Course title</label>
                    <Input
                      value={form.title}
                      onChange={(event) => handleTitleChange(event.target.value)}
                      placeholder="Advanced JavaScript Bootcamp"
                      className="border-slate-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-medium text-slate-800">Slug</label>
                      <span className="text-xs text-slate-500">Auto-generated from title, but editable</span>
                    </div>
                    <Input
                      value={form.slug}
                      onChange={(event) => {
                        setSlugTouched(true)
                        setForm((current) => ({ ...current, slug: slugify(event.target.value) }))
                      }}
                      placeholder="advanced-javascript-bootcamp"
                      className="border-slate-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-800">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                      placeholder="Describe what learners will achieve in this course."
                      rows={4}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-800">Thumbnail URL</label>
                    <Input
                      value={form.thumbnailUrl}
                      onChange={(event) => setForm((current) => ({ ...current, thumbnailUrl: event.target.value }))}
                      placeholder="https://..."
                      className="border-slate-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-800">Preview video URL</label>
                    <Input
                      value={form.previewVideoUrl}
                      onChange={(event) => setForm((current) => ({ ...current, previewVideoUrl: event.target.value }))}
                      placeholder="https://..."
                      className="border-slate-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-800">Difficulty level</label>
                    <Select
                      value={form.difficultyLevel}
                      onValueChange={(value: CourseLevel) =>
                        setForm((current) => ({ ...current, difficultyLevel: value }))
                      }
                    >
                      <SelectTrigger className="w-full border-slate-200 bg-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-800">Status at creation</label>
                    <Select
                      value={form.status}
                      onValueChange={(value: "draft" | "published") =>
                        setForm((current) => ({ ...current, status: value }))
                      }
                    >
                      <SelectTrigger className="w-full border-slate-200 bg-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-800">Total duration (seconds)</label>
                    <Input
                      type="number"
                      min="0"
                      value={form.totalDurationSeconds}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          totalDurationSeconds: event.target.value,
                        }))
                      }
                      placeholder="10800"
                      className="border-slate-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-800">Price (USD)</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                      disabled={form.isFree}
                      placeholder="49"
                      className="border-slate-200 bg-white"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Checkbox
                      checked={form.isFree}
                      onCheckedChange={(checked) =>
                        setForm((current) => ({
                          ...current,
                          isFree: Boolean(checked),
                          price: checked ? "0" : current.price,
                        }))
                      }
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Make this a free course</p>
                      <p className="text-xs text-slate-500">If enabled, the course price is automatically set to zero.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 bg-slate-50 px-6 py-6 lg:border-l lg:border-t-0">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">Assign teachers</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      These options now come from your real platform memberships.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {teacherOptions.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-500">
                        No assignable teachers found yet. The course can still be created and assigned later.
                      </div>
                    ) : (
                      teacherOptions.map((teacher) => {
                        const checked = form.teacherIds.includes(teacher.id)

                        return (
                          <label
                            key={teacher.id}
                            className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-green-200 hover:bg-green-50/40"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(value) => handleTeacherToggle(teacher.id, Boolean(value))}
                              className="mt-0.5"
                            />
                            <div>
                              <p className="text-sm font-medium text-slate-900">{teacher.username}</p>
                              <p className="text-xs text-slate-500">{teacher.email}</p>
                              <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">{teacher.role}</p>
                            </div>
                          </label>
                        )
                      })
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h4 className="text-sm font-semibold text-slate-900">Creation summary</h4>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <div className="flex items-center justify-between gap-3">
                        <span>Status</span>
                        <Badge variant="outline" className={statusBadgeClass(form.status)}>
                          {form.status === "draft" ? "Draft" : "Published"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Teachers selected</span>
                        <span className="font-medium text-slate-900">{form.teacherIds.length}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Price mode</span>
                        <span className="font-medium text-slate-900">{form.isFree ? "Free" : "Paid"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Chapters</span>
                        <span className="font-medium text-slate-900">Add later</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={isSaving || !form.title.trim() || !form.slug.trim() || !form.description.trim()}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      {isSaving ? <IconLoader2 className="size-4 animate-spin" /> : null}
                      Create Course
                    </Button>
                    <Button variant="outline" onClick={handleCloseCreate} className="border-slate-200 bg-white">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
