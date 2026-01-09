import { IStatus } from "../../global/types/type";

export interface ITeacherState{
    teacherInstituteNumber:number | null,
    teacherEmail: string,
    teacherPassword: string,

};

export interface ITeacherInitialState {
    teacher: ITeacherState,
    status: IStatus
};