'use client'

import React, { useState } from 'react'
import { ITeacherState } from '@/src/lib/store/slices/institute/teacher/instituteTeacherSliceTypes';
import { Edit2, Trash2 } from 'lucide-react';

interface ITeacherSideBar {
  selectedTeacher: ITeacherState| null,
  sidebarCloseModal: () => void
};

const TeacherSidebar: React.FC<ITeacherSideBar> = ({ selectedTeacher, sidebarCloseModal }) => {
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
                    <h2 className="text-lg font-semibold text-gray-900">Teacher Details</h2>

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
                            {selectedTeacher?.teacherPhoto ? (
                                <img
                                    src={selectedTeacher.teacherPhoto}
                                    alt={selectedTeacher.teacherName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* Teacher Info */}
                        <div className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Teacher Name
                                </label>
                                <p className="text-base font-semibold text-gray-900">
                                    {selectedTeacher?.teacherName}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Price
                                </label>
                                <p className="text-base font-semibold text-gray-900">
                                    Rs. {selectedTeacher?.teacherEmail}
                                </p>
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Level
                                </label>
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                                    {selectedTeacher?.teacherExperience}
                                </span>
                            </div>

                            {/* Joined Date */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Description
                                </label>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {selectedTeacher?.joinedDate}
                                </p>
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Category ID
                                </label>
                                <p className="text-sm text-gray-900 font-mono">
                                    {selectedTeacher?.salary}
                                </p>
                            </div>

                            {/* PhoneNumber */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Duration
                                </label>
                                <p className="text-sm text-gray-900">
                                    {selectedTeacher?.teacherPhoneNumber}
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
                            <TeacherEditModal
                                Teachers={selectedTeacher}
                                editCloseModal={editCloseModal}
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
                            <TeacherDeletePopupModal
                                deleteCloseModal={deleteCloseModal}
                                selectedTeacher={selectedTeacher}
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
    )
}

export default TeacherSidebar