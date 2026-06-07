import { cookies } from 'next/headers';
import React from 'react';

import { getProfileAction } from '@/lib/actions/userActions';
import { AppProvider } from '@/store/appProvider';

const CustomLayout = async ({ children }) => {
  const userRes = await getProfileAction();
  const user = userRes?.data || {};
  const cookieStore = await cookies();
  const token = cookieStore.get('TRULINK_ACCESS_TOKEN')?.value;
  return <AppProvider externalState={{ user, token }}>{children}</AppProvider>;
};

export default CustomLayout;
