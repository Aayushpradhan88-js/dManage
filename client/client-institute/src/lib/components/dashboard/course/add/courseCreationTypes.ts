export interface ICourseFormData {
    courseName: string,
    coursePrice: string,
    courseLevel: 'beginner' | 'intermediate' | 'advance',
    courseDescription: string,
    courseThumbnail: File | null | string,
    courseDuration: string,
    teacherId: string,
    categoryId: string,
}

export interface ICourseTableRow {
    id: string,
    courseName: string,
    courseDescription: string,
    createdAt: string
}