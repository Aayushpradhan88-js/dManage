"use client"

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/customHook';
import { useDispatch } from 'react-redux';
import { APIInstituteTeacher, setSelectedTeacher } from '@/src/lib/store/slices/institute/teacher/teacherSlice';
import TeacherCreationModal from '@/src/lib/components/dashboard/teacher/add/TeacherCreationModal';
import TeacherSidebar from '@/src/lib/components/dashboard/teacher/sidebar/TeacherSidebar';

const TeacherPage = () => {
  const dispatch = useAppDispatch();
  const { data: teacher, selectedTeacher } = useAppSelector((store) => store.teacher);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    dispatch(APIInstituteTeacher.getAllTeacher())
  }, []);


  //modal form open & close
  //Create Action
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  //sidebar
  const sidebarCloseModal = () => {
    setIsSidebarOpen(false)
    // dispatch(selectedCourse(null));
  };

  const handleRowClick = (courseId: string) => {
    console.log("1. Row clicked, courseId:", courseId);
    dispatch(APIInstituteTeacher.getSingleInstituteteacher(courseId));
    setIsSidebarOpen(true);
    console.log("2. Sidebar should open");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Teachers</h1>
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
            placeholder="Search Category"
          />
        </div>

        {/* Add Category Button */}
        {isCreateModalOpen && <TeacherCreationModal closeModal={closeCreateModal} />}
        <button
          onClick={openCreateModal}
          className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-linear-to-r bg-green-500 text-white rounded-lg  hover:bg-green-600 transition-all font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Teacher
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
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Salary
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Joined Date
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {teacher.length > 0 ? (
                teacher.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => handleRowClick(t.id)}

                    className={`cursor-pointer transition ${selectedTeacher?.id === t.id
                      ? 'bg-green-50 border-l-4 border-green-500'
                      : 'hover: bg-gray-50'
                      }`}>
                    {/* ID */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-500 truncate max-w-37.5"
                        title={t?.id}
                      >
                        {t?.id
                          .slice(0, 8)
                        }
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {t?.teacherName}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {t?.teacherEmail}
                      </div>
                    </td>

                    {/* Salary */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 line-clamp-2">
                        रु {t?.salary}
                      </div>
                    </td>

                    {/* Joined <Date></Date> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(t?.joinedDate?.toString())?.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-lg font-medium">No categories found</p>
                      <p className="text-sm mt-1">
                        {/* {searchedText ? 'Try adjusting your search' : 'Get started by adding a new category'} */}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isSidebarOpen && selectedTeacher && (
        <TeacherSidebar
          selectedTeacher={selectedTeacher}
          sidebarCloseModal={sidebarCloseModal}
        />
      )}

        {/* Table Footer */}
        {/* {filteredData.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredData.length}</span> of{' '}
              <span className="font-medium">{categories.length}</span> categories
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default TeacherPage;