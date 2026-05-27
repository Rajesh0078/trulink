import React from 'react';

import Sidebar from '@/components/common/Sidebar';
import { AppProvider } from '@/store/appProvider';

const layout = async ({ children }) => {
  return (
    <AppProvider>
      <div className="h-dvh flex text-white">
        <Sidebar />
        {children}
      </div>
    </AppProvider>
  );
};

export default layout;
