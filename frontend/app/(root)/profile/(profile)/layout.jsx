import React from 'react';

import MyProfile from '../../_components/MyProfile';

import TitleCard from '@/components/common/TitleCard';
import { logoutAction } from '@/lib/actions/authActions';

const layout = ({ profile, activity }) => {
  return (
    <div className="px-[4%] py-6 md:py-10 w-full overflow-y-auto">
      <TitleCard desc="Manage your identity and connections" title="My Profile" />
      <div className="lg:flex-center">
        <div className="flex-center items-start flex-col lg:flex-row gap-6 mt-8 lg:max-w-260">
          <MyProfile />
          <div className="flex flex-col gap-4 pb-12 lg:pb-0">
            {profile}
            {activity}
            <button
              onClick={logoutAction}
              className="btn-outlined bg-red-500/10 border-red-500! text-red-500 h-10! rounded-md! hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
