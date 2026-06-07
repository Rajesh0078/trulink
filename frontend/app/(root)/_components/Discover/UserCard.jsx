import Link from 'next/link';
import React from 'react';
const interestColors = [
  {
    bg: 'bg-red-100/20',
    text: 'text-red-500'
  },
  {
    bg: 'bg-blue-100/20',
    text: 'text-blue-600'
  },
  {
    bg: 'bg-green-100/20',
    text: 'text-green-600'
  },
  {
    bg: 'bg-yellow-100/20',
    text: 'text-yellow-600'
  },
  {
    bg: 'bg-purple-100/20',
    text: 'text-purple-500'
  },
  {
    bg: 'bg-pink-100/20',
    text: 'text-pink-600'
  },
  {
    bg: 'bg-cyan-200/20',
    text: 'text-cyan-600'
  }
];

const UserCard = ({ user }) => {
  return (
    <div className="card p-4 min-w-60 rounded-lg!">
      <div className="text-xl capitalize">{user.display_name}</div>
      <p className="text-xs text-white/60 lowercase">#{user?.username}</p>
      <p className="text-xs text-text-2 mt-2">{user?.bio || 'No bio added'}</p>
      <div className="flex gap-2 text-xs mt-2">
        {user?.interests?.map((i, index) => {
          const color = interestColors[index % interestColors.length];
          return (
            <div
              key={index}
              className={`
                text-xs p-1 px-2 rounded-full capitalize
                ${color.bg}
                ${color.text}
              `}
            >
              {i}
            </div>
          );
        })}
      </div>
      <div className="w-full flex-between text-xs">
        <div className="flex gap-2 mt-2">
          <Link
            href={`/profile/${user.username.toLowerCase()}`}
            className="btn-outlined text-xs! p-1! px-3! bg-accent! text-white h-7!"
          >
            View Profile
          </Link>
          <button className="btn-outlined text-xs! p-1! px-3! bg-accent! text-white h-7!">
            Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
