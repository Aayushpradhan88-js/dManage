'use client'

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/customHook';
import { toast } from 'sonner';
import { APICourse } from '@/src/lib/store/slices/institute/course/courseSlice';
import { APICategory } from '@/src/lib/store/slices/institute/category/categorySlice';
import { ICourseFormData } from './courseCreationTypes';
import { APIInstituteTeacher } from '@/src/lib/store/slices/institute/teacher/teacherSlice';

interface ICloseModal {
    closeModal: () => void
}

const CourseCreationModal: React.FC<ICloseModal> = ({ closeModal }) => {
    const dispatch = useAppDispatch();
    const [courseFormData, setCourseFormData] = useState<ICourseFormData>({
        courseName: "",
        coursePrice: "",
        courseLevel: "beginner",
        courseDescription: "",
        courseThumbnail: "",
        courseDuration: "",
        categoryId: "",
        teacherId: ""
    });
    const [Loading, setLoading] = useState(false);
    const [displayPrice, setDisplayPrice] = useState("");
    const [priceError, setPriceError] = useState("");
    const [fileName, setFileName] = useState("");
    const { data: categories } = useAppSelector((store) => store.category) // getting categories
    const { data: teachers } = useAppSelector((store) => store.teacher);   // teacher slice

    // Format number with commas
    const formatNumberWithCommas = (num: string): string => {
        // Remove all non-digit characters
        const cleanNum = num.replace(/\D/g, '');

        // Add commas
        return cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Handle price input with validation and formatting
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/,/g, ''); // Remove commas for validation

        // Check if it's a valid number
        if (numericValue && !/^\d+$/.test(numericValue)) {
            return;
        }

        const MAX_PRICE = 100000; // 1 lakh

        if (numericValue && parseInt(numericValue) > MAX_PRICE) {
            setPriceError(`Maximum price allowed is ₹${formatNumberWithCommas(MAX_PRICE.toString())}`);
            return;
        } else {
            setPriceError("");
        }

        // Update both the actual value and display value
        setCourseFormData({
            ...courseFormData,
            coursePrice: numericValue
        });
        setDisplayPrice(formatNumberWithCommas(numericValue));
    };

    // Handle file input
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setCourseFormData({
                ...courseFormData,
                courseThumbnail: file as any
            });
        }
    };

    //Storing input data at state
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourseFormData({
            ...courseFormData,
            [name]: value
        });
    };

    //Form Submission to Backend
    const handleFormSubmission = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (priceError) {
            toast.error('Please fix the price error before submitting');
            return;
        };
        setLoading(true);
        try {
            await dispatch(APICourse.createInstituteCourse(courseFormData));
            // Refresh courses list immediately
            await dispatch(APICourse.getAllInstituteCourses());
            setCourseFormData({
                courseName: "",
                coursePrice: "",
                courseLevel: "beginner",
                courseDescription: "",
                courseThumbnail: "",
                courseDuration: "",
                teacherId: "",
                categoryId: "",
            });
            setDisplayPrice("");
            setFileName("");
            setPriceError("");

            toast.success('Course Added successfully');

            // Close modal after short delay
            setTimeout(() => {
                closeModal();
            }, 600);
        } catch (error) {
            toast.error('Failed to create Course', {
                description: 'Please try again later',
            });
            console.error("error Course creation", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(APICourse.getAllInstituteCourses()); //Course Fetch
        if (categories.length === 0) {
            dispatch(APICategory.fetchAllCategory()); //Category Fetch
        };
        if (teachers.length == 0) {
            dispatch(APIInstituteTeacher.getAllTeacher()); //Teacher Fetch
        }
    }, []);

    //Cancel 
    const handleCancel = () => {
        setCourseFormData({
            courseName: "",
            coursePrice: "",
            courseLevel: "beginner",
            courseDescription: "",
            courseThumbnail: "",
            courseDuration: "",
            categoryId: "",
            courseTeacher: ""
        });
        setDisplayPrice("");
        setFileName("");
        setPriceError("");
        closeModal();
    };

    //Course Level
    const courseLevel = ['beginner', 'intermediate', 'advance'];

    return (
        <div id="modal" className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[95vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700 z-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Course</h3>

                        {/* cross icon */}
                        <button
                            onClick={closeModal}
                            id="closeModalButton"
                            type="button"
                            className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleFormSubmission} className="px-6 py-4">
                    <div className="space-y-3">
                        {/* Course name */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input
                                id="courseName"
                                type="text"
                                name="courseName"
                                value={courseFormData.courseName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="course name"
                                required
                            />
                        </div>

                        {/* Course Price with formatting */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Price
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">₹</span>
                                </div>
                                <input
                                    id="coursePrice"
                                    name="coursePrice"
                                    value={displayPrice}
                                    onChange={handlePriceChange}
                                    className={`w-full pl-8 pr-3 py-2 text-sm border ${priceError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${priceError ? 'focus:ring-red-500' : 'focus:ring-indigo-500 dark:focus:ring-indigo-400'} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500`}
                                    placeholder="10,000"
                                    required
                                />
                            </div>
                            {priceError && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{priceError}</p>
                            )}
                        </div>

                        {/* Course Level and Duration in grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Level
                                </label>
                                <select
                                    onChange={handleChange}
                                    name="courseLevel"
                                    value={courseFormData.courseLevel}
                                    className="cursor-pointer w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                                    {courseLevel.map((cl) => {
                                        return (
                                            <option key={cl} value={cl}>{cl}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* Course Duration */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Duration
                                </label>
                                <input
                                    id="courseDuration"
                                    name="courseDuration"
                                    value={courseFormData.courseDuration}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="3 months"
                                    required
                                />
                            </div>
                        </div>

                        {/* Course Description */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                value={courseFormData.courseDescription}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="write description about course"
                                rows={2}
                                required
                            />
                        </div>

                        {/* Course Thumbnail with Icon */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Thumbnail
                            </label>
                            <label
                                htmlFor="courseThumbnail"
                                className="cursor-pointer flex items-center justify-between px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                                <span className="flex items-center gap-2">
                                    {/* Upload Icon */}
                                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="truncate text-xs">
                                        {fileName || "Choose File"}
                                    </span>
                                </span>
                                {/* Image Icon */}
                                {fileName && (
                                    <svg className="h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                )}
                            </label>
                            <input
                                id="courseThumbnail"
                                type="file"
                                name="courseThumbnail"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                                required
                            />
                            {fileName && (
                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {fileName}
                                </p>
                            )}
                        </div>

                        {/* Course Category and Teacher in grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category
                                </label>
                                <select
                                    onChange={handleChange}
                                    id="categoryId"
                                    name="categoryId"
                                    value={courseFormData.categoryId}
                                    className="cursor-pointer w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                                    required>
                                    <option value="">Select Category</option>
                                    {categories.map((category) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* Course Teacher */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Teacher
                                </label>
                                <select
                                    onChange={handleChange}
                                    id="teacherId"
                                    name="teacherId"
                                    value={courseFormData?.teacherId}
                                    className="cursor-pointer w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                                    required>
                                    <option value="">Select Teacher</option>
                                    {teachers.map((teacher) => {
                                        return (
                                            <option
                                                key={teacher?.id}
                                                value={teacher?.id}
                                            >
                                                {teacher?.teacherName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 -mx-6 -mb-0 mt-4">
                        {/* cancel */}
                        <button
                            onClick={handleCancel}
                            id="cancelButton"
                            type="button"
                            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                            Cancel
                        </button>

                        {/* create */}
                        <button
                            id="submitButton"
                            type='submit'
                            disabled={Loading || !!priceError}
                            className="cursor-pointer flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 dark:from-green-500 dark:to-green-500 dark:hover:from-green-600 dark:hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            {Loading ?
                                (
                                    <>
                                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
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

export default CourseCreationModal