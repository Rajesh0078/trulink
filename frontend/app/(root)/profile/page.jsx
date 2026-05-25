import Avatar from '@/components/ui/Avatar/Avatar'
import React from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import { TiCamera } from 'react-icons/ti'
import MyProfile from '../_components/MyProfile';
import { getProfileAction } from '@/lib/actions/userActions';

const Profile = async () => {
  const res = await getProfileAction();
  const data = res?.data || {};
  return (
    <div className='h-full w-full overflow-y-auto scrollbar-thumb-text-3 scrollbar-thin'>
      <div className='bg-gray-800 w-full h-24 sm:h-40 border-b border-border relative -z-10'>
        <button className='btn-outlined flex-center gap-2 absolute right-4 top-4 px-1 sm:px-3'>
          <BiSolidPencil className='text-xl mb-px inline sm:hidden' />
          <TiCamera className='text-xl mb-px hidden sm:inline' />
          <span className='hidden sm:inline'>Edit Cover Photo</span>
        </button>
      </div>
      <div>
        <Avatar
          className="ml-5 sm:ml-5 -mt-8 sm:-mt-15 relative custom-gradient h-15 w-15 sm:h-26 sm:w-26"
          labelClass="text-2xl sm:text-[46px]"
        />
        <MyProfile user={data} />
      </div>
    </div>
  )
}

export default Profile  