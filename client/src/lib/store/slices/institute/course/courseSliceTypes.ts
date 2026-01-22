import { IStatus } from "../../../global/types/type";

//DB Modal
export interface ICourseDB {
    id: string,
    courseName: string,
    courseDescription: string,
    coursePrice: string,
    courseDuration: string,
    courseLevel: 'beginner' | 'intermediate' | 'advance',
    courseThumbnail: string,
    teacher_id: string,
    category_id: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ICourseState {
    data: ICourseDB[], //FROM CourseDB [{}, {}, {}, {}, {}]
    selectedCourse: ICourseDB | null,
    status: IStatus
}

// API Response types
export interface ICreateCourseResponse {
  success: IStatus,
  data: ICourseDB,
  message: string,
}

export interface IGetCoursesResponse {
  success: IStatus,
  data: ICourseDB[],
}

export interface IUpdateCourseResponse {
  success: IStatus,
  data: ICourseDB,
  message: string,
}

export interface IDeleteCourseResponse {
  success: IStatus,
  message: string,
}