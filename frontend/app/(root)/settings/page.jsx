import React from 'react';

import Settings from './Settings';

const page = async () => {
  return (
    <section className="page">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <h3 className="text-md text-text-2 mt-0">Customize your TruLink experience</h3>
      </div>
      <Settings />
    </section>
  );
};

export default page;
