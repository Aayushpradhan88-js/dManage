const API_BASE_URL = "http://localhost:8000"

export type PublicPlatform = {
  id: string
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  createdAt: string
  ownerName: string
  email: string | null
  phone: string | null
  address: string | null
  courseCount: number
}

export type PlatformCourse = {
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  price: number
  status: string
  createdAt: string
}

export type PublicPlatformDetail = Omit<PublicPlatform, "courseCount"> & {
  courses: PlatformCourse[]
}

type ApiResponse<T> = {
  data: T
  message: string
}

export async function getPublicInstitutes() {
  const response = await fetch(`${API_BASE_URL}/api/platform/public`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch platforms")
  }

  const result = (await response.json()) as ApiResponse<PublicPlatform[]>
  return result.data
}

export async function getPublicInstituteDetail(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/platform/public/${id}`, {
    cache: "no-store",
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Failed to fetch platform details")
  }

  const result = (await response.json()) as ApiResponse<PublicPlatformDetail>
  return result.data
}
