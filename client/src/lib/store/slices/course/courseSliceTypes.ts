import { IStatus } from "../../global/types/type";

export interface ICourseState {
    courseName: string,
    courseDescription: string,
    coursePrice: number | string,
    courseDuration: string,
    courseThumbnail: string,
    courseInstructor: string,
    courseSyllabus: string,
    courseLevel: string,
    courseTeacher: string
};

export interface ICourseIntialState {
    course: ICourseState,
    status: IStatus
};