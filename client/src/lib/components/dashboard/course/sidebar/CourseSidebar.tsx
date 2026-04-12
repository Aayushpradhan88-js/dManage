"use client"

import React, { useState } from 'react';
import { ICourseDB } from '@/src/lib/store/slices/institute/course/courseSliceTypes';
import { X, Trash2, Edit2 } from 'lucide-react';
import CourseEditModal from './edit/CourseEditModal';
import CourseDeletePopupModal from './delete/CourseDeletePopupModal';

interface ICourseSideBar {
  selectedcourse: ICourseDB | null,
  sidebarCloseModal: () => void
};

const CourseSidebar: React.FC<ICourseSideBar> = ({ selectedcourse, sidebarCloseModal }) => {
  const [isEditModalData, setIsEditModalData] = useState<boolean>(false);     //edit
  const [isDeleteModalData, setIsDeleteModalData] = useState<boolean>(false); //delete

  //Edit modal
  const editOpenModal = () => setIsEditModalData(true);
  const editCloseModal = () => setIsEditModalData(false);

  //Delete Modal
  const deleteOpenModal = () => setIsDeleteModalData(true);
  const deleteCloseModal = () => setIsDeleteModalData(false);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={sidebarCloseModal}
      />

      {/* Sidebar Panel */}
      <div className="fixed right-0 top-0 h-screen w-100 bg-white shadow-2xl z-50 flex flex-col animate-slide-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Course Details</h2>

          {/* Cross symbol */}
          <button
            onClick={sidebarCloseModal}
            className="p-1 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">

            {/* Thumbnail */}
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              {selectedcourse?.courseThumbnail ? (
                <img
                  src={selectedcourse.courseThumbnail}
                  alt={selectedcourse.courseName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Course Name
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {selectedcourse?.courseName}
                </p>
              </div>

              {/* Course Instructor */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Course Instructor
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {selectedcourse?.teacher_id}
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Price
                </label>
                <p className="text-base font-semibold text-gray-900">
                  Rs. {selectedcourse?.coursePrice}
                </p>
              </div>

              {/* Level */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Level
                </label>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                  {selectedcourse?.courseLevel}
                </span>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Description
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {selectedcourse?.courseDescription}
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Category ID
                </label>
                <p className="text-base font-semibold text-gray-900 ">
                  {selectedcourse?.category_id}
                </p>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Duration
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {selectedcourse?.courseDuration}
                </p>
              </div>

              {/* Created At */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Created At
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {selectedcourse?.createdAt && new Date(selectedcourse.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Action Buttons at Bottom */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">

            {/* Edit Button */}
            {isEditModalData &&
              <CourseEditModal
                selectedCourses={selectedcourse}
                editCloseModal={editCloseModal}
                sidebarCloseModal={sidebarCloseModal}
              />
            }
            <button
              onClick={editOpenModal}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              <Edit2 size={18} />
              Edit
            </button>

            {/* Delete Button */}
            {isDeleteModalData &&
              <CourseDeletePopupModal
                selectedcourse={selectedcourse}
                deleteCloseModal={deleteCloseModal}
                sidebarCloseModal={sidebarCloseModal}
              />
            }
            <button
              onClick={deleteOpenModal}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSidebar;