import Dashboard from '@/src/lib/components/dashboard/Dashboard';
import React from 'react';
import { Toaster } from 'sonner';

const instituteDashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Toaster position="bottom-center" richColors />
      <Dashboard>
        {children}
      </Dashboard>
    </div>
  )
}

export default instituteDashboardLayout