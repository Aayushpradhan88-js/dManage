import { IStatus } from "../../../global/types/type";

export interface IInstituteCourseInitialDataCourse {
    id: string,
    courseName: string,
    coursePrice:string,
}

export interface ICourseState {
    courseName: string,
    courseDescription: string,
    coursePrice: number | string,
    courseDuration: string,
    courseThumbnail: string,
    categoryId: string,
    courseLevel: string,
    courseTeacher: string
};

export interface ICourseIntialState {
    // course: ICourseState[],
    course: ICourseState,
    status: IStatus
};