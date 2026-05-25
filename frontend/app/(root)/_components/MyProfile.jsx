"use client"
import React from 'react'
import { formatDate } from '@/lib/utils/helpers';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineLink } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { MdHistory } from 'react-icons/md';
import Link from 'next/link';

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
    text: 'text-yellow-500',
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
  },
]

const Info = ({ title, info }) => {
  return (
    <div>
      <p className='uppercase text-text-3'>{title || "Title"}</p>
      <p className='capitalize'>{info || "-"}</p>
    </div>
  )
}

const MyProfile = ({ user }) => {
  return (
    <div className='py-4 px-6 mt-2 w-full '>
      <h1 className='text-[20px] sm:text-2xl sm:font-bold'>
        {user?.full_name || user?.first_name || 'User'}
      </h1>
      <p className='text-text-2'>
        @{user?.username || 'username'} | Joined {formatDate(user?.createdAt) || 'N/A'}
      </p>
      <p className='mt-1 text-text-3 leading-5 text-sm'>
        &quot;{user?.bio || 'No bio yet updated!.'}&quot;
      </p>
      <div>
        {
          user?.interests && user.interests.length > 0 && (
            <div className='mt-3 flex items-center gap-2 flex-wrap'>
              {user.interests.map((interest, index) => {
                const color = interestColors[index % interestColors.length]

                return (
                  <span
                    key={index}
                    className={`
                      text-sm px-3 py-1 rounded-full
                      ${color.bg}
                      ${color.text}
                    `}
                  >
                    {interest}
                  </span>
                )
              })}
            </div>
          )
        }
      </div>
      <div className='text-text-3 flex text-sm items-center mt-3 gap-3 gap-y-1 flex-wrap sm:flex-nowrap'>
        {
          user?.address?.city && (
            <div className='flex items-center justify-center gap-1'>
              <FaLocationDot className='text-[16px]' />
              <div>
                {user?.address?.city || 'Unknown Location'}, {user?.address?.country || 'Unknown Country'}
              </div>
            </div>
          )
        }
        <div className='flex items-center justify-center gap-1'>
          <AiOutlineLink className='text-[18px]' />
          <div>
            trulink.com/{user?.username || 'username'}
          </div>
        </div>
      </div>
      <div className='w-full flex gap-4 mt-6 flex-wrap pb-20 sm:pb-4'>
        <div className='p-4 px-5 min-h-40 card max-w-150!'>
          <div className='flex-between'>
            <div className='text-lg font-semibold'>
              Personal Information
            </div>
            <Link prefetch href={'/profile/edit'} className='btn-outlined flex-center gap-2 absolute right-4 top-4 px-1 sm:px-2'>
              <BiSolidPencil className='text-[18px]' />
              <span className='hidden sm:inline'>Edit Profile</span>
            </Link>
          </div>
          <div className='flex mt-6 gap-3 text-sm border-b border-border-2 pb-4 flex-wrap'>
            <div className='flex flex-col gap-3 flex-1'>
              <Info info={user?.full_name} title={"Display Name"} />
              <Info info={user?.email} title={"Email"} />
              <Info info={formatDate(user?.createdAt)} title={"Joined"} />
            </div>
            <div className='flex flex-col gap-3 flex-1'>
              <Info info={user?.username} title={"User Name"} />
              <Info info={user?.dob} title={"Date of Birth"} />
              <Info info={user?.account_type} title={"Account Type"} />
            </div>
          </div>
          <div className='mt-3'>
            <p className='uppercase text-text-3'>{"Address"}</p>
            <p className='leading-6'>{user?.address?.formatted_address || "-"}</p>
          </div>
        </div>
        <div className='p-4 card flex-1 max-w-none!'>
          <div className='flex-between'>
            <div className='text-lg font-semibold'>
              Recent Activity
            </div>
            <button className='btn-outlined flex-center gap-2 absolute right-4 top-4 px-1 sm:px-2'>
              <MdHistory className='text-[18px]' />
              <span className='hidden sm:inline'>View All</span>
            </button>
          </div>
          <div className='w-full mt-6'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile