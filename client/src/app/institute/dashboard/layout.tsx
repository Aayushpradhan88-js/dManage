import React from 'react'

const instituteDashboardLayout = ({children}: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <div>
        <h1>Hey there dashboard</h1>
        {children}
    </div>
  )
}

export default instituteDashboardLayout