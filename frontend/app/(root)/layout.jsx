import Sidebar from '@/components/common/Sidebar';
import { getProfileAction } from '@/lib/actions/userActions';
import { AppProvider } from '@/store/appProvider';
import React from 'react'

const layout = async ({ children }) => {
  const res = await getProfileAction();
  const data = res?.data || {};
  return (
    <AppProvider externalState={{ user: data }}>
      <div className='h-dvh flex text-white'>
        <Sidebar />
        {children}
      </div>
    </AppProvider>
  )
}

export default layout