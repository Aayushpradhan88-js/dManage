import { IStatus } from "../../../global/types/type";

export interface ITeacherState{
    id: string,
    teacherName: string,
    teacherEmail: string,
    teacherPassword: string,
    teacherPhoneNumber: string,
    teacherExperience: string,
    joinedDate: string,
    salary: string,
    teacherPhoto: string,
};

export interface ITeacherInitialState {
    data: ITeacherState[],
    selectedTeacher: ITeacherState | null,
    status: IStatus,
};