import React from 'react';

import Settings from './Settings';

import { getProfileAction } from '@/lib/actions/userActions';

const page = async () => {
  const res = await getProfileAction();
  const user = res?.data || {};
  return (
    <section className="page">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <h3 className="text-md text-text-2 mt-0">Customize your TruLink experience</h3>
      </div>
      <Settings user={user} />
    </section>
  );
};

export default page;
