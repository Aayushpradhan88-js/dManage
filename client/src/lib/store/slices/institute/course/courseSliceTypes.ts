import { IStatus } from "../../../global/types/type";

export interface IInstituteCourseInitialDataCourse {
    id: string,
    courseName: string,
    coursePrice:string,
};

export interface ICourseIntialState {
    courses: IInstituteCourseInitialDataCourse[],
    status: IStatus
};

export interface ICourseCreate {
    courseName: string,
    courseDescription: string,
    coursePrice: number | string,
    courseDuration: string,
    courseThumbnail: string,
    categoryId: string,
    courseLevel: string,
    courseTeacher: string
};