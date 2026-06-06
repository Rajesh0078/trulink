import React from 'react';

import { getProfileAction } from '@/lib/actions/userActions';
import { AppProvider } from '@/store/appProvider';

const CustomLayout = async ({ children }) => {
  const userRes = await getProfileAction();
  const user = userRes?.data || {};
  return <AppProvider externalState={{ user }}>{children}</AppProvider>;
};

export default CustomLayout;
