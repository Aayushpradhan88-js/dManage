"use client"

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@/src/lib/store/hooks/customHook';
import { ITeacherForm } from './teacherCreationModalTypes';
import { APIInstituteTeacher } from '@/src/lib/store/slices/institute/teacher/teacherSlice';
import { toast } from 'sonner';

interface ICloseModal {
    closeModal: () => void
};

const TeacherCreationModal: React.FC<ICloseModal> = ({ closeModal }) => {
    const dispatch = useAppDispatch();
    const [teacherFormData, setTeacherFormData] = useState<ITeacherForm>({
        teacherName: "",
        teacherEmail: "",
        teacherPhoneNumber: "",
        teacherExperience: "",
        joinedDate: "",
        salary: "",
        teacherPhoto: "",
    });
    const [Loading, setLoading] = useState(false);

    //Storing input data at state
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTeacherFormData({
            ...teacherFormData,
            //@ts-ignore
            [name]: name === "teacherPhoto" ? e.target.files[0] : value
        });
    };
    // console.log(" ✅step: 1 userData", teacherFormData);

    //Form Submission to Backend
    const handleFormSubmission = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(APIInstituteTeacher?.createTeacher(teacherFormData));  //API Call teacher Slice      
            await dispatch(APIInstituteTeacher?.getAllTeacher()); //showing immediate data in the table
            setTeacherFormData({
                teacherName: "",
                teacherEmail: "",
                teacherPhoneNumber: "",
                teacherExperience: "",
                joinedDate: "",
                salary: "",
                teacherPhoto: "",
            });

            // Close modal after short delay
            setTimeout(() => {
                closeModal();
            }, 600);

            toast.success('teacher Added successfully');
        } catch (error) {
            setLoading(false);
            toast.error('Failed to create teacher', {
                description: 'Please try again later',
            });
            console.error("error teacher creation", error);
        };
    };

    useEffect(() => {
        dispatch(APIInstituteTeacher.getAllTeacher()); //teacher Fetch
    }, []);

    //Cancel 
    const handleCancel = () => {
        setTeacherFormData({
            teacherName: "",
            teacherEmail: "",
            teacherPhoneNumber: "",
            teacherExperience: "",
            joinedDate: "",
            salary: "",
            teacherPhoto: "",
        });
        closeModal();
    };

    return (
        <div id="modal" className="fixed inset-0  bg-black/40 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add teacher</h3>

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
                    <div>
                        {/* teacher name */}
                        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            id="teacherName"
                            type="text"
                            name="teacherName"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="John Doe"
                            required
                        />

                        {/* teacher Email */}
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            id="teacherEmail"
                            name="teacherEmail"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="john@email.com"
                            required
                        />

                        {/* teacher PhoneNumber*/}
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            PhoneNumber
                        </label>
                        <input
                            id="teacherPhoneNumber"
                            name="teacherPhoneNumber"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="XXXXXXXXXX"
                            required
                        />

                        {/* teacherExperience */}
                        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Experience
                        </label>
                        <input
                            id="teacherExperience"
                            type="text"
                            name="teacherExperience"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder=""
                            required
                        />

                        {/* teacher joinedDate */}
                        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Joined Date
                        </label>
                        <input
                            id="joinedDate"
                            name="joinedDate"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="YYY-MM-D"
                            required
                        />

                        {/* teacher salary */}
                        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Salary
                        </label>
                        <input
                            id="salary"
                            name="salary"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder=""
                            required
                        />

                        {/* teacher Photo */}
                        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Photo
                        </label>
                        <input
                            id="teacherPhoto"
                            name="teacherPhoto"
                            type='file'
                            onChange={handleChange}
                            className="cursor-pointer w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="3 month" required
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
                            className="cursor-pointer flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-linear-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 dark:from-green-500 dark:to-green-500 dark:hover:from-green-600 dark:hover:to-green-600">
                            {Loading ?
                                (
                                    <>
                                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Teacher...
                                    </>
                                ) :
                                (
                                    <>
                                        Create
                                        <svg className="h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </>
                                )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TeacherCreationModal