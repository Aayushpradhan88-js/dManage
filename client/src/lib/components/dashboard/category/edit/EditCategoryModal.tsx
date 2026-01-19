import React from 'react';
interface IEditCategory {
    closeEditModal: () => void,
    categoryId: string,
    categoryName: string,
    categoryDescription: string
}

const EditCategoryModal: React.FC<IEditCategory> = ({ closeEditModal, categoryId, categoryName, categoryDescription }) => {

    
    return (
        <div>EditCategoryModal</div>
    )
}

export default EditCategoryModal;