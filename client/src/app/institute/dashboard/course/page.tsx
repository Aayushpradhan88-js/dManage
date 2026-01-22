"use client"

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/customHook';
// import { IDeleteModal, IEditAdditionalParamerter } from '../course/courseTypes';
import CourseCreationModal from '@/src/lib/components/dashboard/course/add/CourseCreationModal';
import { APICourse } from '@/src/lib/store/slices/institute/course/courseSlice';
import { ICourseState } from './courseTypes';

const CoursePage = () => {
  const dispatch = useAppDispatch();
  const { data: courses, status } = useAppSelector((store) => store.course);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //api call fetch all course
  useEffect(() => {
    dispatch(APICourse.getAllInstituteCourses());
  }, []);

  useEffect(() => {
    if (courses) {
      console.log("categories", courses);
    }
  }, [courses]);

  if (status === 'success') return <div>Loading...</div>;
  // if (!categories) return <div>No data</div>;

  //modal form open & close
  //Create Action
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
      </div>

      {/* Search & Add Button Row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            // value={searchedText}
            // onChange={(e) => setSearchedText(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2  focus:border-green-600 bg-white"
            placeholder="Search Course"
          />
        </div>

        {/* Add Course Button */}
        {isModalOpen && <CourseCreationModal closeModal={closeModal} />}
        <button
          onClick={openModal}
          className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-linear-to-r bg-green-500 text-white rounded-lg  hover:bg-green-600 transition-all font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Course
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Id
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  CreatedAt
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
             {
              courses.map((course: ICourseState) => (
                 <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                   {/* ID */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-500 truncate max-w-37.5" title={course.id}>
                        {course?.id.slice(0, 8)}...
                      </div>
                    </td>
                   {/* ID */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-500 truncate max-w-37.5">
                        {course?.courseName}
                      </div>
                    </td>
                   {/* ID */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-500 truncate max-w-37.5">
                        {course?.courseDescription}
                      </div>
                    </td>
                   {/* ID */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-500 truncate max-w-37.5">
                        {course?.createdAt}
                      </div>
                    </td>
                 </tr>
              ))
             }
          </tbody>
        </table>
      </div>
    </div >
    </div >
  )
}

export default CoursePage;