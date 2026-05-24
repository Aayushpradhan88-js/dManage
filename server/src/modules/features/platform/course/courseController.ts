import type { Response } from "express"
import { CourseLevel, CourseStatus, DmanageRole, type Prisma } from "@prisma/client"

import { db } from "../../../../db/connection.ts"
import type { IExtendedRequest } from "../../../global/types/types.ts"

function slugifyCourseTitle(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 280)
}

async function resolveActivePlatformMembership(userId?: string) {
  if (!userId) {
    return null
  }

  return db.platformMembership.findFirst({
    where: {
      userId,
      isActive: true,
      role: {
        in: [DmanageRole.admin, DmanageRole.teacher],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      platform: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  })
}

async function createUniqueSlug(baseSlug: string) {
  const fallbackSlug = baseSlug || `course-${Date.now()}`
  let nextSlug = fallbackSlug
  let suffix = 1

  while (await db.course.findUnique({ where: { slug: nextSlug }, select: { id: true } })) {
    nextSlug = `${fallbackSlug}-${suffix}`
    suffix += 1
  }

  return nextSlug
}

function normalizeCourseStatus(value: unknown) {
  const status = String(value ?? "")
    .trim()
    .toLowerCase()

  if (status === CourseStatus.published) {
    return CourseStatus.published
  }

  if (status === CourseStatus.archived) {
    return CourseStatus.archived
  }

  return CourseStatus.draft
}

function normalizeCourseLevel(value: unknown) {
  const level = String(value ?? "")
    .trim()
    .toLowerCase()

  if (level === CourseLevel.intermediate) {
    return CourseLevel.intermediate
  }

  if (level === CourseLevel.advanced) {
    return CourseLevel.advanced
  }

  return CourseLevel.beginner
}

type CourseWithRelations = Prisma.CourseGetPayload<{
  include: {
    platform: {
      select: {
        id: true
        name: true
        slug: true
      }
    }
    teachers: {
      include: {
        membership: {
          include: {
            user: {
              select: {
                id: true
                username: true
                email: true
              }
            }
          }
        }
      }
    }
    _count: {
      select: {
        chapters: true
        enrollments: true
      }
    }
  }
}>

function mapCourseResponse(course: CourseWithRelations) {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    thumbnailUrl: course.thumbnailUrl,
    previewVideoUrl: course.preview_video_url,
    difficultyLevel: course.difficulty_level,
    totalDurationSeconds: course.total_duration_seconds,
    isFree: course.is_free,
    price: Number(course.price),
    status: course.status,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    platform: course.platform,
    teachers: course.teachers.map((courseTeacher) => ({
      id: courseTeacher.membership.id,
      role: courseTeacher.membership.role,
      user: {
        id: courseTeacher.membership.user.id,
        username: courseTeacher.membership.user.username,
        email: courseTeacher.membership.user.email,
      },
    })),
    chaptersCount: course._count.chapters,
    studentsCount: course._count.enrollments,
  }
}

class CourseController {
  static async createCourse(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const membership = await resolveActivePlatformMembership(userId)

    if (!membership) {
      return res.status(403).json({
        message: "No active platform membership found for this user",
      })
    }

    const title = String(req.body?.title ?? "").trim()
    const requestedSlug = String(req.body?.slug ?? "").trim()
    const description = String(req.body?.description ?? "").trim()
    const thumbnailUrl = String(req.body?.thumbnailUrl ?? "").trim() || null
    const previewVideoUrl = String(req.body?.previewVideoUrl ?? "").trim() || null
    const difficultyLevel = normalizeCourseLevel(req.body?.difficultyLevel)
    const totalDurationSecondsValue = Number(req.body?.totalDurationSeconds ?? 0)
    const isFree = Boolean(req.body?.isFree)
    const priceValue = Number(req.body?.price ?? 0)
    const status = normalizeCourseStatus(req.body?.status)

    const teacherIdsRaw = Array.isArray(req.body?.teacherIds)
      ? req.body.teacherIds
      : typeof req.body?.teacherIds === "string"
        ? [req.body.teacherIds]
        : []

    const teacherIds = teacherIdsRaw
      .map((value: unknown) => String(value).trim())
      .filter(Boolean)

    if (!title) {
      return res.status(400).json({ message: "Course title is required" })
    }

    if (!description) {
      return res.status(400).json({ message: "Course description is required" })
    }

    const baseSlug = slugifyCourseTitle(requestedSlug || title)

    if (!baseSlug) {
      return res.status(400).json({ message: "Course slug is invalid" })
    }

    const uniqueSlug = await createUniqueSlug(baseSlug)
    const totalDurationSeconds = Number.isFinite(totalDurationSecondsValue) && totalDurationSecondsValue > 0
      ? Math.floor(totalDurationSecondsValue)
      : null
    const normalizedPrice = isFree ? 0 : Number.isFinite(priceValue) && priceValue > 0 ? priceValue : 0

    const assignableMemberships = teacherIds.length > 0
      ? await db.platformMembership.findMany({
          where: {
            id: {
              in: teacherIds,
            },
            platformId: membership.platformId,
            isActive: true,
            role: {
              in: [DmanageRole.teacher, DmanageRole.admin],
            },
          },
          select: {
            id: true,
          },
        })
      : []

    const createdCourse = await db.course.create({
      data: {
        platformId: membership.platformId,
        title,
        description,
        slug: uniqueSlug,
        thumbnailUrl,
        preview_video_url: previewVideoUrl,
        difficulty_level: difficultyLevel,
        total_duration_seconds: totalDurationSeconds,
        is_free: isFree,
        price: normalizedPrice,
        status,
        teachers: {
          create: assignableMemberships.map((teacherMembership) => ({
            membershipId: teacherMembership.id,
          })),
        },
      },
      include: {
        platform: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        teachers: {
          include: {
            membership: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            chapters: true,
            enrollments: true,
          },
        },
      },
    })

    return res.status(201).json({
      message: "Course created successfully",
      data: mapCourseResponse(createdCourse),
      meta: {
        requestedTeacherCount: teacherIds.length,
        assignedTeacherCount: assignableMemberships.length,
      },
    })
  }

  static async getAllCourses(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const membership = await resolveActivePlatformMembership(userId)

    if (!membership) {
      return res.status(403).json({
        message: "No active platform membership found for this user",
      })
    }

    const courses = await db.course.findMany({
      where: {
        platformId: membership.platformId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        platform: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        teachers: {
          include: {
            membership: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            chapters: true,
            enrollments: true,
          },
        },
      },
    })

    return res.status(200).json({
      message: "Courses fetched successfully",
      data: courses.map(mapCourseResponse),
    })
  }

  static async getAssignableTeachers(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const membership = await resolveActivePlatformMembership(userId)

    if (!membership) {
      return res.status(403).json({
        message: "No active platform membership found for this user",
      })
    }

    const teachers = await db.platformMembership.findMany({
      where: {
        platformId: membership.platformId,
        isActive: true,
        role: {
          in: [DmanageRole.teacher, DmanageRole.admin],
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        role: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    })

    return res.status(200).json({
      message: "Assignable teachers fetched successfully",
      data: teachers.map((teacher) => ({
        id: teacher.id,
        role: teacher.role,
        userId: teacher.user.id,
        username: teacher.user.username,
        email: teacher.user.email,
      })),
    })
  }

  static async getSingleCourse(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id
    const courseId = req.params.id

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (!courseId) {
      return res.status(400).json({ message: "Course id is required" })
    }

    const membership = await resolveActivePlatformMembership(userId)

    if (!membership) {
      return res.status(403).json({
        message: "No active platform membership found for this user",
      })
    }

    const course = await db.course.findFirst({
      where: {
        id: courseId,
        platformId: membership.platformId,
      },
      include: {
        platform: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        teachers: {
          include: {
            membership: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            chapters: true,
            enrollments: true,
          },
        },
      },
    })

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    return res.status(200).json({
      message: "Course fetched successfully",
      data: mapCourseResponse(course),
    })
  }

  static async updateSingleCourse(req: IExtendedRequest, res: Response) {
    return res.status(501).json({
      message: "Prisma course update is not implemented yet",
    })
  }

  static async deleteSingleCourse(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id
    const courseId = req.params.id

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (!courseId) {
      return res.status(400).json({ message: "Course id is required" })
    }

    const membership = await resolveActivePlatformMembership(userId)

    if (!membership) {
      return res.status(403).json({
        message: "No active platform membership found for this user",
      })
    }

    const course = await db.course.findFirst({
      where: {
        id: courseId,
        platformId: membership.platformId,
      },
      select: {
        id: true,
      },
    })

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    await db.course.delete({
      where: {
        id: courseId,
      },
    })

    return res.status(200).json({
      message: "Course deleted successfully",
    })
  }
}

export default CourseController
