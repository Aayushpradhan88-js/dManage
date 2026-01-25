'use client'

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/customHook';
import { APICategory } from '@/src/lib/store/slices/institute/category/categorySlice';
import { ICategoryStateAdditionalData } from '@/src/lib/store/slices/institute/category/categorySliceTypes';
import CategoryCreationModal from '@/src/lib/components/dashboard/category/add/CategoryCreationModal';
import DeletePopupModal from '@/src/lib/components/dashboard/category/delete/DeletePopupModal';
import EditCategoryModal from '@/src/lib/components/dashboard/category/edit/EditCategoryModal';
import { IDeleteModal, IEditAdditionalParamerter } from './categoryTypes';

function CategoryPage() {
  const dispatch = useAppDispatch();
  const { data: categories, status } = useAppSelector((store) => store.category);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalData, setIsDeleteModalData] = useState<IDeleteModal>({
    isOpen: false,
    id: ''
  });
  const [isEditModalData, setIsEditDeleteModal] = useState<IEditAdditionalParamerter>({
    isOpen: false,
    categoryId: '',
    categoryName: '',
    categoryDescription: ''
  });
  const [searchedText, setSearchedText] = useState<string>("");

  //api call fetch all category
  useEffect(() => {
    dispatch(APICategory.fetchAllCategory());
  }, []);

  // useEffect(() => {
  //   if (categories) {
  //     console.log("categories", categories);
  //   }
  // }, [categories]);

  if (status === 'success') return <div>Loading...</div>;
  if (!categories) return <div>No data</div>;

  //modal form open & close
  //Create Action
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //Delete Action
  const openDeleteModal = (id: string) => {
    setIsDeleteModalData({
      isOpen: true,
      id
    })
  };
  const closeDeleteModal = () => {
    setIsDeleteModalData({
      isOpen: false,
      id: ''
    })
  };

  //Edit Action
  const openEditModal = (categoryId: string, categoryName: string, categoryDescription: string) => {
    setIsEditDeleteModal({
      isOpen: true,
      categoryId,
      categoryName,
      categoryDescription
    });
  };
  const closeEditModal = () => {
    setIsEditDeleteModal({
      isOpen: false,
      categoryId: '',
      categoryName: '',
      categoryDescription: ''
    });
  };

  //search
  const filteredData = categories.filter((category) => category.categoryName.includes(searchedText));
  // console.log("data", filteredData);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Category</h1>
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
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2  focus:border-green-600 bg-white"
            placeholder="Search Category"
          />
        </div>

        {/* Add Category Button */}
        {isModalOpen && <CategoryCreationModal closeModal={closeModal} />}
        <button
          onClick={openModal}
          className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-linear-to-r bg-green-500 text-white rounded-lg  hover:bg-green-600 transition-all font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-2/6">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Created At
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((category: ICategoryStateAdditionalData) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    {/* ID */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-500 truncate max-w-37.5" title={category.id}>
                        {category?.id.slice(0, 8)}...
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {category?.categoryName}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {category?.categoryDescription}
                      </div>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(category?.createdAt?.toString())?.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">

                        {/* Edit Button */}
                        {isEditModalData.isOpen && <EditCategoryModal
                          closeEditModal={closeEditModal}
                          categoryId={isEditModalData.categoryId}
                          categoryName={isEditModalData.categoryName}
                          categoryDescription={isEditModalData.categoryDescription}
                        />}
                        <button
                          onClick={() => openEditModal(category.id, category.categoryName, category.categoryDescription)}
                          title="Edit"
                          className="cursor-pointer  p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {isDeleteModalData.isOpen && (
                          <DeletePopupModal
                            closeDeleteModal={closeDeleteModal}
                            categoryId={isDeleteModalData.id}
                          />
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => openDeleteModal(category.id)}
                          className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>

                        {/* More Options */}
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="More"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
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
                        {searchedText ? 'Try adjusting your search' : 'Get started by adding a new category'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredData.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredData.length}</span> of{' '}
              <span className="font-medium">{categories.length}</span> categories
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage