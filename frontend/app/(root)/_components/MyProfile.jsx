'use client';
import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';

import Avatar from '@/components/ui/Avatar/Avatar';
import { useStore } from '@/store/appProvider';

const interestColors = [
  {
    bg: 'bg-red-100/20',
    text: 'text-red-400'
  },
  {
    bg: 'bg-blue-100/20',
    text: 'text-blue-500'
  },
  {
    bg: 'bg-green-100/20',
    text: 'text-green-500'
  },
  {
    bg: 'bg-yellow-100/20',
    text: 'text-yellow-500'
  },
  {
    bg: 'bg-purple-100/20',
    text: 'text-purple-300'
  },
  {
    bg: 'bg-pink-100/20',
    text: 'text-pink-600'
  },
  {
    bg: 'bg-cyan-200/20',
    text: 'text-cyan-500'
  }
];

const MyProfile = () => {
  const {
    state: { user }
  } = useStore();
  return (
    <div className="w-full lg:w-auto">
      <div className="card p-0 overflow-hidden h-full relative max-w-none! w-full">
        <div className="bg-accent w-full lg:w-90 h-26"></div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <Avatar
            className="mx-auto relative custom-gradient h-20 w-20 sm:h-24 sm:w-24"
            labelClass="text-2xl sm:text-[46px]"
          />
        </div>
        <div className="py-4 px-6 w-full mt-10 text-center">
          <h1 className="text-[20px] sm:text-2xl sm:font-extrabold capitalize tracking-wider">
            {user?.display_name || 'User'}
          </h1>
          <div className="text-text-2 text-sm sm:text-[16px] flex gap-2 my-1 justify-center">
            <span className="text-blue-400">@{user?.username || 'No username'}</span>
            <span>|</span>
            <span className="flex items-center gap-1 text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              Online
            </span>
          </div>
          <p className="mt-2 text-text-2 leading-5 text-sm text-center">
            &quot;{user?.bio || 'No bio yet updated!.'}&quot;
          </p>
          <div className="text-text-3 flex-center text-[13px] sm:text-sm mt-3">
            {user?.address?.city && (
              <div className="flex items-center justify-center gap-1">
                <FaLocationDot className="text-[16px]" />
                <div>
                  {user?.address?.city || 'Unknown Location'},{' '}
                  {user?.address?.country || 'Unknown Country'}
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 flex-center border border-border-2 rounded-xl bg-surface-2 mb-2">
            <div className="w-full p-2 flex-center flex-col">
              <p className="text-[20px]">1214</p>
              <p className="text-xs text-text-3">Chats</p>
            </div>
            <div className="w-full p-2 flex-center flex-col border-x border-border-2">
              <p className="text-[20px]">89</p>
              <p className="text-xs text-text-3">Friends</p>
            </div>
            <div className="w-full p-2 flex-center flex-col">
              <p className="text-[20px]">4.8</p>
              <p className="text-xs text-text-3">Rating</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 text-blue-400 mt-3">
            <AiOutlineLink className="text-[18px]" />
            <div>trulink.online/{user?.username || 'username'}</div>
          </div>
        </div>
      </div>
      {user?.interests?.length > 0 && (
        <div className="card p-6 mt-6 lg:mt-4 h-full w-full max-w-none!">
          <h2 className="capitalize font-bold text-text-2">Interests</h2>
          <div className="mt-3 flex items-center justify-start gap-1 sm:gap-2 flex-wrap">
            {user.interests.map((interest, index) => {
              const color = interestColors[index % interestColors.length];

              return (
                <span
                  key={index}
                  className={`
                      text-xs sm:text-sm px-3 py-1 rounded-full
                      ${color.bg}
                      ${color.text}
                    `}
                >
                  {interest}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
