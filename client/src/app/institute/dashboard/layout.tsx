import Dashboard from '@/src/lib/components/dashboard/Dashboard'
import React from 'react'

const instituteDashboardLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
        <Dashboard>
          {children}
        </Dashboard>
    </div>
  )
}

export default instituteDashboardLayout