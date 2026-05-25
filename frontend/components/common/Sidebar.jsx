'use client'
import Image from 'next/image'
import React from 'react';
import Link from 'next/link';
import LOGO from '@/public/icons/flame.svg';
import { useStore } from '@/store/appProvider';
import { PiGear, PiGearSixFill } from 'react-icons/pi';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { TiUser } from 'react-icons/ti';
import { BiSolidBolt } from 'react-icons/bi';
import { RiMapPin2Fill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import { FaBell } from 'react-icons/fa';

const navItems = [
  { href: "/discover", icon: RiMapPin2Fill },
  { href: "/chat", icon: IoChatbubblesSharp },
  { href: "/match", icon: BiSolidBolt },
  { href: "/profile", icon: TiUser },
  { href: "/settings", icon: PiGearSixFill },
];

const Sidebar = () => {
  const { state: { user } } = useStore();
  const pathname = usePathname();
  return (
    <>
      {/* Mobile View */}
      <div className="flex-center sm:hidden fixed bottom-0 w-full z-1000">
        <div className="bg-surface-2 border-t shadow border-border-2 backdrop-blur-3xl h-13 w-full flex justify-around items-center">
          {navItems.map(({ href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`h-full flex-center border-b-2 transition-colors ${active
                  ? "text-accent-3 border-accent-3"
                  : "text-text-2 border-transparent"
                  }`}
              >
                <Icon className="text-2xl" />
              </Link>
            );
          })}

        </div>
      </div>

      {/* Web View */}
      <div className='h-full w-14 border-r border-border-2 flex-between flex-col py-3 z-60 hidden sm:flex'>
        <div className='w-full'>
          <div className='h-10 w-full text-white rounded flex-center'>
            <Link href="/discover" className="inline-block">
              <Image src={LOGO} alt="flame_logo" loading="eager" className='h-9 w-9 pointer-events-none' />
            </Link>
          </div>
          <div className='flex-center flex-col gap-4 mt-8 text-text-2'>
            {
              navItems.map(({ href, icon: Icon }) => {
                const active = pathname === href;
                if (href === "/settings" || href === "/profile") return null;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`h-full w-full flex-center border-l-2 transition-colors ${active
                      ? "text-accent-3 border-accent-3"
                      : "text-text-2 border-transparent"
                      }`}
                  >
                    <Icon className="text-[22px]" />
                  </Link>
                )
              })
            }
            <Link
              href={'/notifications'}
              className={`h-full w-full flex-center border-l-2 transition-colors ${pathname === "/notifications"
                ? "text-accent-3 border-accent-3"
                : "text-text-2 border-transparent"
                }`}
            >
              <FaBell className="text-[20px]" />
            </Link>
          </div>
        </div>
        <div className='flex-center flex-col gap-3'>
          <div className='text-2xl'>
            <Link href="/settings">
              <PiGearSixFill className='text-text-2' />
            </Link>
          </div>
          <Link href="/profile">
            <div className='min-h-9 w-9 bg-surface-2 text-sm text-text-2 rounded-full flex-center font-semibold border border-border-2 hover:opacity-80'>
              {user?.first_name?.[0]?.toUpperCase() || 'A'}
              {user?.last_name?.[0]?.toUpperCase() || 'U'}
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar