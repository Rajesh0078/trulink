import React from 'react';
import { IoLogOut } from 'react-icons/io5';

import MyProfile from '../_components/MyProfile';

import Avatar from '@/components/ui/Avatar/Avatar';
import { logoutAction } from '@/lib/actions/authActions';
import { getProfileAction } from '@/lib/actions/userActions';

const Profile = async () => {
  const res = await getProfileAction();
  const data = res?.data || {};
  return (
    <div className="h-full w-full overflow-y-auto scrollbar-thumb-text-3 scrollbar-thin relative">
      <div className="bg-gray-800 w-full h-24 sm:h-40 border-b border-border relative -z-10"></div>
      <button
        onClick={logoutAction}
        className="btn-outlined text-white! cursor-pointer flex-center gap-2 absolute right-4 top-4 px-3"
      >
        <IoLogOut className="text-xl mb-px" />
        <span>Logout</span>
      </button>
      <div>
        <Avatar
          className="mx-auto sm:ml-5 -mt-10 sm:-mt-14 relative custom-gradient h-20 w-20 sm:h-26 sm:w-26"
          labelClass="text-2xl sm:text-[46px]"
        />
        <MyProfile user={data} />
      </div>
    </div>
  );
};

export default Profile;
