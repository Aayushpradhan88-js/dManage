import React from 'react'
import Sidebar from './sidebar';

const Dashboard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar/>
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">{children}</p>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;