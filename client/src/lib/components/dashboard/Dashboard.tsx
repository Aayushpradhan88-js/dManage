import React from 'react'

const Dashboard = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="bg-white w-64 border-r shadow-sm">
                {/* Sidebar Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {/* <img src="https://tailwindflex.com/images/logo.svg" alt="Logo" className="h-8 w-8" /> */}
                            <span className="text-lg font-semibold">Dashboard</span>
                        </div>
                        <button className="text-gray-500 hover:text-gray-600 lg:hidden">
                            {/* <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokelinecap="round"
                                    strokelinejoin="round" strokewidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg> */}
                        </button>
                    </div>
                </div>
                {/* Sidebar Content */}
                <div className="py-4">
                    {/* Navigation Section */}
                    <div className="px-4 mb-4">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</h2>
                        <nav className="mt-2 space-y-1">
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
                                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokelinecap="round"
                                        strokelinejoin="round" strokewidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </a>
                            {/* Collapsible Menu Item */}
                            <div className="relative">
                                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokelinecap="round"
                                            strokelinejoin="round" strokewidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    Projects
                                    <svg className="ml-auto h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {/* Submenu */}
                                <div className="mt-1 pl-11 space-y-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Active</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Archived</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Drafts</a>
                                </div>
                            </div>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokelinecap="round"
                                        strokelinejoin="round" strokewidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Team
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokelinecap="round"
                                        strokelinejoin="round" strokewidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Calendar
                            </a>
                        </nav>
                    </div>
                    {/* Settings Section */}
                    <div className="px-4 mb-4">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h2>
                        <nav className="mt-2 space-y-1">
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokelinecap="round
              "
                                        strokelinejoin="round" strokewidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path
                                        strokelinecap="round"
                                        strokelinejoin="round" strokewidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        // strokelinecap="round"
                                        strokelinejoin="round" strokewidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                Preferences
                            </a>
                        </nav>
                    </div>
                </div>
                {/* User Profile */}
                <div className="border-t mt-auto">
                    <div className="p-4">
                        <div className="flex items-center">
                            {/* <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" className="h-8 w-8 rounded-full" /> */}
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">Rajesh Maheshwari</p>
                                <p className="text-xs text-gray-500">rajeshmaheshwari@gmail.com</p>
                            </div>
                            <button className="ml-auto text-gray-400 hover:text-gray-500">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 bg-gray-50 flex">
                {children}
            </div>
        </div>
    )
}

export default Dashboard;