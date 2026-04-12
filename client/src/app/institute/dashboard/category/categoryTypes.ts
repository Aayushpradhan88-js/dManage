export interface IDeleteModal {
    isOpen: boolean,
    id: string,
};

export interface IEditModal {
    categoryId: string,
    categoryName: string, 
    categoryDescription: string
};

export interface IEditAdditionalParamerter extends IEditModal {
    isOpen: boolean
}