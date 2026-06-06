import React from 'react';

import CustomLayout from './CustomLayout';

import Sidebar from '@/components/common/Sidebar';

const layout = async ({ children }) => {
  return (
    <CustomLayout>
      <div className="h-dvh flex text-white">
        <Sidebar />
        {children}
      </div>
    </CustomLayout>
  );
};

export default layout;
