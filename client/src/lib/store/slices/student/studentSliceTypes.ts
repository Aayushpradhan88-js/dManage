import { IStatus } from "../../global/types/type";

export interface IStudentState {
    studentName: string,
    studentPhoneNo: string,
    studentAddress: string,
    enrolledDate: string,
    studentImage: string,
    course: string,
};

export interface IStudentInitialState {
    student: IStudentState,
    status: IStatus,
};