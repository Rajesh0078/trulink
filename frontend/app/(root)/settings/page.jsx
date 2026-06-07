import React from 'react';

import Settings from './Settings';

import TitleCard from '@/components/common/TitleCard';

const page = async () => {
  return (
    <section className="px-[4%] py-6 md:py-10 w-full overflow-y-auto">
      <TitleCard desc="Customize your TruLink experience" title="Settings" />
      <div className="lg:flex-center">
        <div className="flex-center items-start flex-col lg:flex-row gap-6 mt-4">
          <Settings />
        </div>
      </div>
    </section>
  );
};

export default page;
