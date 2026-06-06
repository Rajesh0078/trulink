'use client';
import Image from 'next/image';
import React from 'react';

import { useStore } from '@/store/appProvider';

const Avatar = ({ customAvatar, className, labelClass }) => {
  const {
    state: { user }
  } = useStore();
  return (
    <div className={`border-2 border-text rounded-full ${className}`}>
      {customAvatar && (
        <Image
          src={customAvatar}
          alt="avatar"
          width={300}
          height={300}
          className="h-full w-full rounded-full object-cover"
        />
      )}
      {!customAvatar && user?.avatar && (
        <Image
          src={user.avatar}
          width={300}
          height={300}
          alt="avatar"
          className="h-full w-full rounded-full object-cover"
        />
      )}
      {!customAvatar && !user?.avatar && (
        <div
          className={`flex-center h-full w-full rounded-full text-white font-bold ${labelClass}`}
        >
          {user?.display_name?.[0]?.toUpperCase() || 'A'}
        </div>
      )}
    </div>
  );
};

export default Avatar;
