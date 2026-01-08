import { IStatus } from "../../global/types/type"

export interface ITeacherState{
    teacherName: string,
    teacherEmail: string,
    teacherPassword: string,
    teacherPhoneNumber: string,
    teacherExperience: string,
    joinedDate: string,
    salary: string,
    teacherPhoto: string,
    course: string
};

export interface ITeacherInitialState {
    teacher: ITeacherInitialState,
    status: IStatus
};