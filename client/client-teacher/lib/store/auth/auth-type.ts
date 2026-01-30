import { IStatus } from "@/lib/global/types/types"

export interface ITeacherAuth {
    teacherInstitute: string,
    teacherEmail: string,
    teacherPassword: string
};

export interface IInitialTeacherAuth {
    data: ITeacherAuth[],
    status: IStatus.LOADING
};