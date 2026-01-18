import { IStatus } from "../../../global/types/type";

export interface ICategoryStateData {
    categoryName: string,
    categoryDescription: string,
};

export interface ICategoryStateAdditionalData extends ICategoryStateData {
    id: string,
    createdAt: string
}

export interface ICategoryInitialState {
    data: ICategoryStateAdditionalData[],
    status: IStatus,
};