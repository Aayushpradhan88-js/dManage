import { IStatus } from "../../../global/types/type";

export interface ICategoryState {
    categoryName: string,
    categoryDescription: string,
};

export interface ICategoryInitialState {
    category: ICategoryState,
    status: IStatus,
};