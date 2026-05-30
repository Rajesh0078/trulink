import React from 'react';
import { FaMapLocation } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';

import DiscoverPage from './DiscoverPage';

import { logoutAction } from '@/lib/actions/authActions';
import { discoverUsers, getProfileAction } from '@/lib/actions/userActions';

const page = async () => {
  const users = await discoverUsers({ distance: 5 });
  const userRes = await getProfileAction();
  const user = userRes?.data || {};
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex-between h-15 border-b border-border-2 px-4 sm:px-8 bg-surface/50">
        <div className="text-[20px] font-extrabold">
          Discover <span className="colored-text hidden xl:inline">Anonymous</span>
          <span className="hidden xl:inline"> users</span>
        </div>
        <div className="flex gap-4">
          <div className="text-text-2 flex-center gap-2 text-sm sm:text-[16px]">
            <FaMapLocation />
            <div>
              {user.address?.city ? (
                <span>
                  {user?.address?.city}, {user?.address?.country}
                </span>
              ) : (
                <span>Update location</span>
              )}
            </div>
          </div>
          <button
            onClick={logoutAction}
            className="btn-outlined px-2 sm:px-4 cursor-pointer flex-center gap-2 bg-red-600/10 border-red-600/60"
          >
            <IoLogOut className="text-xl mb-px text-red-600" />
            <span className="text-red-500 hidden xl:inline">Logout</span>
          </button>
        </div>
      </div>
      <DiscoverPage user={user} users={users?.data || []} />
    </section>
  );
};

export default page;
