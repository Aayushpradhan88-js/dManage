import { IStatus } from "../../../global/types/type";

export interface ICategoryState {
    id: string,
    categoryName: string,
    categoryDescription: string,
    createdAt: string
};

export interface ICategoryInitialState {
    data: ICategoryState[],
    status: IStatus,
};