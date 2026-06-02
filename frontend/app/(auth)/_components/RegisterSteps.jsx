import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiEnvelope } from 'react-icons/hi2';
import { MdSecurity } from 'react-icons/md';
import { TiUser } from 'react-icons/ti';

import LOGO from '@/public/icons/flame.svg';

const TABS = [
  {
    id: 1,
    title: 'Create account',
    desc: 'Email, phone or social sign up',
    key: 'create',
    icon: HiEnvelope
  },
  {
    id: 2,
    title: 'Your profile',
    desc: 'Name, photo and interests',
    key: 'details',
    icon: TiUser
  },
  {
    id: 3,
    title: 'Privacy & consent',
    desc: 'Control your visibility',
    key: 'submit',
    icon: MdSecurity
  }
];

const RegisterSteps = ({ currentTab }) => {
  const activeIndex = TABS.findIndex((t) => t.id === currentTab);
  const progress = (activeIndex / TABS.length) * 100 + activeIndex * 16;
  const completedProgress =
    activeIndex <= 1 ? 0 : ((activeIndex - 1) / TABS.length) * 100 + (activeIndex - 1) * 16;
  return (
    <>
      <div className="xl:hidden px-4 sm:px-10 md:px-16 pt-6 pb-3 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src={LOGO} alt="Flame" height={30} />
            <span className="colored-text mt-1">TruLink</span>
          </Link>
        </div>

        <div className="mt-10">
          <div className="relative w-full">
            {/* Progress Bar */}
            <div className="h-px bg-white/20 rounded-full overflow-hidden ">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{
                  width: `${progress}%`
                }}
              />
            </div>
            <div className="h-px bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-300"
                style={{
                  width: `${completedProgress}%`
                }}
              />
            </div>

            {/* Step Dots */}
            <div className="flex items-center justify-between -mt-4">
              {TABS.map((tab, index) => {
                const activeIndex = TABS.findIndex((t) => t.id === currentTab);
                const isCompleted = index < activeIndex;
                const isActive = index === activeIndex;
                const activeClass = 'bg-accent border-accent text-white';
                const completedClass = 'bg-green-500 border-green-500 text-white';

                const className = isActive
                  ? activeClass
                  : isCompleted
                    ? completedClass
                    : 'bg-surface border-border text-text-2 border-border-2 border';

                return (
                  <div
                    key={tab.id}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${className}`}
                  >
                    {tab.id}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Web View */}
      <div className="w-[30%] min-h-dvh min-w-100 px-[3%] py-16 bg-surface border-r border-border hidden xl:flex flex-col justify-between">
        <div>
          <Link href={'/'} className="flex items-center gap-1 w-full">
            <div>
              <Image src={LOGO} alt="Flame" height={40} />
            </div>
            <span className="text-2xl colored-text mt-1">TruLink</span>
          </Link>
          <div className="mt-10 relative">
            <div>
              <div className="absolute left-5 top-0 h-full w-0.5 bg-border" />
              <div
                className="absolute left-5 top-0 w-0.5 bg-accent"
                style={{ height: `${progress}%` }}
              />
              <div
                className="absolute left-5 top-0 w-0.5 bg-green-400"
                style={{ height: `${completedProgress}%` }}
              />
            </div>

            <div className="flex flex-col gap-12">
              {TABS.map((tab, index) => {
                const isActive = tab.id === currentTab;
                const isCompleted = index < TABS.findIndex((t) => t.id === currentTab);
                const activeClass = 'bg-accent border-accent text-white';
                const completedClass = 'bg-green-500 border-green-500 text-white';

                const className = isActive
                  ? activeClass
                  : isCompleted
                    ? completedClass
                    : 'bg-surface border-border text-text-2';

                return (
                  <div key={tab.id} className="relative flex items-start gap-4 text-left">
                    {/* Step Circle */}
                    <div
                      className={`
                          relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2
                          transition-all duration-300 text-2xl
                          ${className}
                        `}
                    >
                      <tab.icon className="text-[18px]" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col pt-1 text-sm">
                      <p className={`font-medium ${isActive ? 'text-white' : 'text-text-2'}`}>
                        {tab.title}
                      </p>
                      <p className="text-xs text-text-3">{tab.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-border-2 flex gap-2 py-4 text-text-2 text-sm">
          Already have an account?
          <Link href={'/login'} className="text-accent-2 font-medium text-[15px]">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterSteps;
