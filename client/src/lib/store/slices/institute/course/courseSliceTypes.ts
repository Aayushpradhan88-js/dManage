import { IStatus } from "../../../global/types/type";

export interface IInstituteCourseInitialDataCourse {
    id: string,
    courseName: string,
    coursePrice:string,
};

export interface ISingleCourse{
    singleCourse: null,
};

export interface ICourseIntialState {
    courses: IInstituteCourseInitialDataCourse[],
    status: IStatus,
    course: ISingleCourse
};


export interface ICourseCreate {
    courseName: string,
    coursePrice: number | string,
    courseLevel: string,
    courseDescription: string,
    courseThumbnail: string,
    courseDuration: string,
    categoryId: string,
    courseTeacher: string
};