import Sidebar from '@/components/common/Sidebar';
import { AppProvider } from '@/store/appProvider';
import React from 'react'

const layout = async ({ children }) => {
  return (
    <AppProvider>
      <div className='h-dvh flex text-white'>
        <Sidebar />
        {children}
      </div>
    </AppProvider>
  )
}

export default layout