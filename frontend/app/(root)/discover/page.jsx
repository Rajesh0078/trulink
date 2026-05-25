import Avatar from '@/components/ui/Avatar/Avatar';
import { discoverUsers } from '@/lib/actions/userActions';
import React from 'react'

const USER_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-emerald-500',
];

const Discover = async () => {
  const res = await discoverUsers({ distance: 50 });
  return (
    <section className='page'>
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        Discover <span className='colored-text text-2xl sm:text-3xl '>Anonymous</span> Connections
      </h1>
      <div className='relative h-[calc(100%-100px)] mt-10 w-full overflow-hidden flex-center'>
        {/* Radar Rings */}
        <div
          className='absolute h-80 w-80 rounded-full border border-accent/50 animate-ping'
          style={{
            animationDuration: '2s',
          }}
        ></div>

        <div
          className='absolute h-64 w-64 rounded-full border border-accent/50 animate-pulse'
          style={{
            animationDuration: '2s',
          }}
        ></div>

        <div
          className='absolute h-96 w-96 rounded-full border border-accent/40 animate-pulse'
          style={{
            animationDuration: '3s',
          }}
        ></div>

        <div
          className='absolute h-126 w-126 rounded-full border border-accent/20 animate-pulse'
          style={{
            animationDuration: '3s',
          }}
        ></div>

        <div
          className='absolute h-150 w-150 rounded-full border border-accent/20 animate-pulse'
          style={{
            animationDuration: '3s',
          }}
        ></div>

        {/* Rotating Radar Beam */}
        <div className='absolute h-146 w-146 rounded-full overflow-hidden'>
          <div className='absolute inset-0 animate-spin' style={{
            animationDuration: '1.5s',
          }}>
            <div className='absolute top-1/2 left-1/2 h-55 w-55 -translate-x-1/2 -translate-y-full origin-bottom bg-linear-to-t from-accent/60 to-transparent blur-3xl rotate-45'></div>
          </div>
        </div>

        {/* User Avatar */}
        <Avatar
          className="min-h-12 min-w-12 flex-center sm:h-30 sm:w-30 custom-gradient"
          labelClass="text-4xl"
        />
      </div>
    </section>
  )
}

export default Discover