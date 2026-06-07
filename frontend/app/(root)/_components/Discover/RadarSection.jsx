import Image from 'next/image';
import React from 'react';

import UserCard from './UserCard';

import Avatar from '@/components/ui/Avatar/Avatar';
import { useStore } from '@/store/appProvider';

const RadarSection = ({ users }) => {
  const {
    state: { onlineUsers }
  } = useStore();
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-90 h-90 sm:w-100 sm:h-100 md:w-125 md:h-125">
        <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl" />

        {/* Radar Rings */}
        {[20, 40, 60, 80, 100].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-accent/20"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              left: `${(100 - size) / 2}%`,
              top: `${(100 - size) / 2}%`
            }}
          />
        ))}

        {/* Crosshair */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-accent/10 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-accent/10 -translate-y-1/2" />

        {/* Radar Beam */}
        <div
          className="absolute inset-0"
          style={{
            animation: 'spin 4s linear infinite'
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 origin-left"
            style={{
              width: '50%',
              height: '2px',
              transform: 'translateY(-50%)'
            }}
          >
            <div className="w-full h-full bg-linear-to-r from-accent via-accent/60 to-transparent shadow-[0_0_20px_var(--accent)]" />
          </div>
        </div>

        {users?.map((user, index) => {
          const positions = [
            { top: '15%', left: '50%' },
            { top: '25%', left: '75%' },
            { top: '50%', left: '85%' },
            { top: '75%', left: '70%' },
            { top: '85%', left: '50%' },
            { top: '70%', left: '20%' },
            { top: '40%', left: '10%' },
            { top: '20%', left: '25%' }
          ];

          const isOnline = onlineUsers.includes(user._id);

          return (
            <div
              key={user._id || index}
              className="absolute group z-10 hover:z-9999"
              style={{
                ...positions[index % positions.length],
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button className="relative h-13 w-13 rounded-full bg-accent flex-center border-2 border-white">
                {isOnline && (
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                )}

                {user?.avatar ? (
                  <Image
                    width={52}
                    height={52}
                    src={user.avatar}
                    alt="avatar_profile"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <span className="uppercase text-xl">{user.display_name?.charAt(0)}</span>
                )}
              </button>

              <div className="hidden group-hover:block absolute left-1/2 top-full mt-2 -translate-x-1/2 z-10000">
                <UserCard user={user} />
              </div>
            </div>
          );
        })}

        {/* Center User */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar
            className="h-16 w-16 sm:h-24 sm:w-24 md:h-30 md:w-30 custom-gradient border-2 border-accent"
            labelClass="text-2xl sm:text-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default RadarSection;
