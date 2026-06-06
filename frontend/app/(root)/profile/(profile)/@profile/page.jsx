'use client';
import Link from 'next/link';
import React from 'react';
import { BiSolidPencil } from 'react-icons/bi';

import { useStore } from '@/store/appProvider';

const Info = ({ title, info }) => {
  return (
    <div>
      <p className="uppercase text-text-3">{title || 'Title'}</p>
      <p className="capitalize">{info || '-'}</p>
    </div>
  );
};

const Page = () => {
  const {
    state: { user }
  } = useStore();
  return (
    <div className="card max-w-none! flex-1/3 min-w-120 h-fit">
      <div className="flex-between">
        <div className="text-lg font-semibold">Personal Information</div>
        <Link prefetch href={'/profile/edit'} className="btn-outlined flex-center gap-2 px-2">
          <BiSolidPencil className="text-[18px]" />
          <span className="inline">Edit Profile</span>
        </Link>
      </div>
      <div className="flex mt-6 gap-3 text-sm border-b border-border-2 pb-6 flex-wrap">
        <div className="flex flex-col gap-3 flex-1">
          <Info info={user?.display_name} title={'Display Name'} />
          <Info info={user?.email} title={'Email'} />
          <Info info={user?.dob} title={'Date of Birth'} />
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <Info info={user?.username} title={'User Name'} />
          <Info info={user?.gender} title={'Gender'} />
          <Info info={user?.account_type} title={'Account Type'} />
        </div>
      </div>
      <div className="mt-4">
        <p className="uppercase text-text-3">{'Address'}</p>
        <p className="leading-6">{user?.address?.formatted_address || '-'}</p>
      </div>
    </div>
  );
};

export default Page;
