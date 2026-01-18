'use client'

import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/src/lib/store/hooks/customHook';
import { APICategory } from '@/src/lib/store/slices/institute/category/categorySlice';
import { ICategoryStateData } from '@/src/lib/store/slices/institute/category/categorySliceTypes';

interface ICloseModal {
    closeModal: () => void,
};

const Modal: React.FC<ICloseModal> = ({ closeModal }) => {
    const dispatch = useAppDispatch();

    const [categoryFormData, setCategoryFormData] = useState<ICategoryStateData>({
        categoryName: '',
        categoryDescription: ''
    });
    const [Loading, setLoading] = useState(false);

    //Storing input data at state
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategoryFormData({
            ...categoryFormData,
            [name]: value
        });
    };
    console.log(" ✅step: 1 userData", categoryFormData);

    //Form Submission to Backend
    const handleFormSubmission = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // console.log("✅step: 2 Form submitted");
        // console.log("✅step: 3 userData:", categoryFormData);
        try {
            await dispatch(APICategory.createCategory(categoryFormData));  //API Call Category Slice
            setLoading(false);
            closeModal();
            console.log("Category creation successful");
        } catch (error) {
            setLoading(false);
            console.error("error category creation", error);
            alert(`Registration failed. Please try again ${(error as Error).message}`);
        };
    };

    //Cancel 
    const handleCancel = () => {
        setCategoryFormData({
            categoryName: '',
            categoryDescription: ''
        });
        closeModal();
    };

    return (
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" />
            <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Category</h3>

                    {/* cross icon */}
                    <button
                        onClick={closeModal}
                        id="closeModalButton"
                        className="cursor-pointer  text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form
                    onSubmit={handleFormSubmission}
                    className="space-y-4">

                    {/* category name */}
                    <div>
                        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            id="categoryName"
                            type="text"
                            name="categoryName"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Software Engineering" required
                        />
                    </div>

                    {/* category description */}
                    <div>
                        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <input
                            id="categoryDescription"
                            type="text"
                            name="categoryDescription"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="Placement Ready Software engineering with modern tools and techniques with AI" required
                        />
                    </div>

                    <div className="flex justify-end gap-3">

                        {/* cancel */}
                        <button
                            onClick={handleCancel}
                            id="cancelButton"
                            className="cursor-pointer  px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                            Cancel
                        </button>

                        {/* create */}
                        <button
                            id="submitButton"
                            type='submit'
                            disabled={Loading}
                            className="cursor-pointer flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600">
                            {Loading ? 'Creating....' : 'Create'}

                            <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;