'use client'

import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/customHook';
import { ICourseDB } from '@/src/lib/store/slices/institute/course/courseSliceTypes'
import React, { ChangeEvent, useState } from 'react'
import { IEditModal } from '../courseSidebarTypes';
import { APICourse } from '@/src/lib/store/slices/institute/course/courseSlice';
import { toast } from 'sonner';

interface IEdit {
  courses: ICourseDB | null,
  editCloseModal: () => void,
  sidebarCloseModal: () => void
};

const CourseEditModal: React.FC<IEdit> = ({ courses, editCloseModal, sidebarCloseModal }) => {
  const dispatch = useAppDispatch();
  console.log("testing update ",courses?.courseDescription);
  const [editFormData, setEditFormData] = useState<IEditModal>({
    courseName: courses?.courseName || '',
    courseDescription: courses?.courseDescription || '',
    coursePrice: courses?.coursePrice || '',
    courseDuration: courses?.courseDuration || '',
    courseLevel: courses?.courseLevel || 'beginner',
    courseThumbnail: '', // File input, leave empty
    categoryId: courses?.category_id || '',
    courseTeacher: courses?.teacher_id || '',
  });
  const [Loading, setLoading] = useState(false);
  const { data: categories } = useAppSelector((store) => store.category);

  //Collecting the input box data
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      //@ts-ignore
      [name]: name === 'courseThumbnail' ? e.target.files[0] : value
    });
  };

  //Submission
  const handleEditFormSubmission = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log("id", courses?.id);
    if (!courses?.id) return;
    await dispatch(APICourse.updateSingleInstituteCourse(courses.id, editFormData)); //API Call Slice

    // Close modal after short delay
    setTimeout(() => {
      editCloseModal();
      sidebarCloseModal();
    }, 600);

    toast.success('Category Updated successfully');
  };

  //Cancel
  const handleCancel = () => {
    setEditFormData({
      courseName: '',
      courseDescription: '',
      coursePrice: '',
      courseDuration: '',
      courseLevel: 'beginner',
      courseThumbnail: '',
      categoryId: '',
      courseTeacher: '',
    });
    editCloseModal();
  };

  const courseLevel = ['beginner', 'intermediate', 'advance'];

  return (
    <div id="modal" className="fixed inset-0  bg-black/40 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Course</h3>

          {/* cross icon */}
          <button
            onClick={editCloseModal}
            id="closeModalButton"
            className="cursor-pointer  text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleEditFormSubmission}
          className="space-y-4">
          <div>
            {/* Course name */}
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              id="courseName"
              type="text"
              name="courseName"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Full stack web development course" required
            />
            {/* Course Price */}
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              id="coursePrice"
              type="text"
              name="coursePrice"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="XXXXX" required
            />

            {/* Course Level */}
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Level
            </label>
            <select
              onChange={handleChange}
              name="courseLevel"
              className="cursor-pointer w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500">
              {
                courseLevel.map((cl) => {
                  return (
                    <option key={cl} value={cl}>{cl}</option>
                  )
                })
              }
            </select>

            {/* Course Description */}
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="" required
            />

            {/* Course Thumbnail */}
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail (Leave empty to keep existing)
            </label>
            <input
              id="courseThumbnail"
              type="file"
              name="courseThumbnail"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="" required
            />
            {courses?.courseThumbnail && !editFormData.courseThumbnail && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Current thumbnail:</p>
                <img
                  src={courses.courseThumbnail}
                  alt="Current"
                  className="h-20 w-20 object-cover rounded border"
                />
              </div>
            )}

            {/* Course Duration */}
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration
            </label>
            <input
              id="courseDuration"
              type="text"
              name="courseDuration"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="3 month" required
            />

            {/* Course Category complete this part */}
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              onChange={handleChange}
              id="categoryId"
              name="categoryId"
              className="cursor-pointer w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500">
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>{category.categoryName}</option>
                )
              })}
            </select>
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
                    Editing Course...
                  </>
                ) :
                (
                  <>
                    Edit
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
  );
};

export default CourseEditModal;