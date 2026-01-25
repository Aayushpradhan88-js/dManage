export interface IDeleteModal {
    isOpen: boolean,
    id: string,
}

export interface IEditModal {
    courseName: string,
    courseDescription: string,
    coursePrice: string,
    courseDuration: string,
    courseLevel: 'beginner' | 'intermediate' | 'advance',
    courseThumbnail: string,
    categoryId?: string,
    courseTeacher?: string,
}