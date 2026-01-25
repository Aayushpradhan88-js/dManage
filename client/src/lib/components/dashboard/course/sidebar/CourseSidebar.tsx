"use client"

import React, { useState } from 'react';
import { ICourseDB } from '@/src/lib/store/slices/institute/course/courseSliceTypes';
import { IDeleteModal, IEditModal } from './courseSidebarTypes';
import { X, Trash2, Edit2 } from 'lucide-react';

interface ICourseSideBar {
  course: ICourseDB | null,
  sidebarCloseModal: () => void
}

const CourseSidebar: React.FC<ICourseSideBar> = ({ course, sidebarCloseModal }) => {

  const [isDeleteModalData, setIsDeleteModalData] = useState<IDeleteModal>({
    isOpen: false,
    id: ''
  });
  const [isEditModalData, setIsEditModalData] = useState<IEditModal>({
    isOpen: false,
    courseName: "",
    coursePrice: "",
    courseLevel: "beginner",
    courseDescription: "",
    courseThumbnail: "",
    courseDuration: "",
    categoryId: "",
    courseTeacher: ""
  });

  console.log("course", course);



  return (
    <>
      {/* Sidebar */}
      <div className="w-96 bg-white border-l shadow-lg flex flex-col">
        {/* Header */}

        {/* Sidebar close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Course Details</h2>
          <button
            onClick={sidebarCloseModal}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Thumbnail */}
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            {course?.courseThumbnail}
          </div>

          {/* Course Info */}
          <div className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Name</label>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {course?.courseName}
              </p>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Price</label>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                Rs. {course?.coursePrice}
              </p>
            </div>

            {/* Level */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Level</label>
              <p className="text-gray-900 mt-1 capitalize">
                {course?.courseLevel}
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Description</label>
              <p className="text-gray-700 mt-1">
                {course?.courseDescription}
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Category</label>
              <p className="text-gray-900 mt-1">
                {course?.category_id}
              </p>
            </div>

            {/* Duration */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Duration</label>
              <p className="text-gray-900 mt-1">
                {course?.courseDuration}
              </p>
            </div>

            {/* createdAt */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Created At</label>
              <p className="text-gray-900 mt-1">
                {/* {new Date(course?.createdAt)?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} */}

                {/* {new Date(course?.createdAt.toDateString())} */}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t flex gap-3">
          <button
            // onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Edit2 size={18} />
            Edit
          </button>
          <button
            // onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {/* {isEditModalOpen && (
        <CourseEditModal
          isOpen={isEditModalOpen}
          course={course}
          onClose={() => setIsEditModalOpen(false)}
        />
      )} */}

      {/* Delete Confirmation Modal */}
      {/* // <CourseDeleteModal
      //   isOpen={isDeleteModalOpen}
      //   courseId={course.id}
      //   courseName={course.courseName}
      //   onClose={() => setIsDeleteModalOpen(false)}
      //   onConfirm={handleConfirmDelete}
      // /> */}
    </>

  )
}

export default CourseSidebar;