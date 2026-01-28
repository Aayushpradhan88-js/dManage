export interface IDeleteModal {
    isOpen: boolean,
    id: string,
}

export interface ICourseEditModal {
    id: string,
    courseName?: string,
    courseDescription?: string,
    coursePrice?: string,
    courseDuration?: string,
    courseLevel?: 'beginner' | 'intermediate' | 'advance',
    courseThumbnail?: string,
    teacherId?: string,
    categoryId?: string,
}