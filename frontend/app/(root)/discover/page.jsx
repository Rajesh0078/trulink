import React from 'react';

import DiscoverPage from './DiscoverPage';

import { discoverUsers } from '@/lib/actions/userActions';

const page = async () => {
  const users = await discoverUsers({ distance: 5 });
  return (
    <section className="w-full">
      <DiscoverPage users={users?.data || []} />
    </section>
  );
};

export default page;
