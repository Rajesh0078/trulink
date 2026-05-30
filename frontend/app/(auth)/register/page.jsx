/* eslint-disable prettier/prettier */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AccountType from '../_components/AccountType';
import RegisterConsent from '../_components/RegisterConsent';
import RegisterDetails from '../_components/RegisterDetails';
import RegisterProfile from '../_components/RegisterProfile';

import LOGO from '@/public/icons/flame.svg';

const TABS = [
  { id: 1, title: 'Account type', desc: 'Anonymous or Permanent', key: 'account_type' },
  { id: 2, title: 'Your details', desc: 'Name, email and password', key: 'details' },
  { id: 3, title: 'Profile setup', desc: 'Photo, bio and interests', key: 'profile' },
  { id: 4, title: 'Privacy & consent', desc: 'Control your visibility', key: 'submit' }
];

const componentMap = {
  account_type: AccountType,
  details: RegisterDetails,
  profile: RegisterProfile,
  submit: RegisterConsent
};

const Register = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      display_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      settings: {
        terms_of_use: true,
        use_anonymous_data: false
      }
    }
  });

  const [state, setState] = useState({
    account_type: 'permanent',
    social_type: 'email'
  });

  const [activeTab, setActiveTab] = useState('account_type');
  const Component = componentMap[activeTab];

  const tabChangeHandler = () => {
    if (activeTab === 'account_type') {
      if (state.account_type === 'guest') { return; }
      setActiveTab('details');
    }
    if (activeTab === 'details') {
      setActiveTab('profile');
    }
    if (activeTab === 'profile') {
      setActiveTab('submit');
    }
  };

  const handleBack = () => {
    if (activeTab === 'details') {
      setActiveTab('account_type');
    }
    if (activeTab === 'profile') {
      setActiveTab('details');
    }
    if (activeTab === 'submit') {
      setActiveTab('profile');
    }
  };

  const submitHandler = (payload) => {
    console.log(payload);
  };

  const handleStateChange = (key, val) => {
    setState((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  let btnLabel = 'Continue';
  let btnType = 'button';
  if (state.account_type === 'guest') {
    btnLabel = 'Continue as Anonymous';
    btnType = 'submit';
  }
  if (state.account_type === 'permanent') {
    if (state.social_type === 'email') {
      btnLabel = 'Continue with email';
    }
    if (state.social_type === 'phone') {
      btnLabel = 'Continue with phone';
    }
    if (state.social_type === 'apple') {
      btnLabel = 'Continue with apple';
    }
    if (state.social_type === 'facebook') {
      btnLabel = 'Continue with facebook';
    }
  }
  if (activeTab === 'details') {
    btnLabel = 'Continue to Profile';
  }

  const activeIndex = TABS.findIndex((t) => t.key === activeTab);
  const progress = ((activeIndex / TABS.length) * 100) + (activeIndex * 8);
  const completedProgress = activeIndex <= 1 ? 0 : (((activeIndex - 1) / TABS.length) * 100) + ((activeIndex - 1) * 8);
  return (
    <div className="flex flex-col xl:flex-row h-full pb-6 sm:pb-0">
      {/* Mobile View Stepper */}
      <div className="xl:hidden px-[4%] p-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src={LOGO} alt="Flame" height={26} />
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
                const activeIndex = TABS.findIndex((t) => t.key === activeTab);
                const isCompleted = index < activeIndex;
                const isActive = index === activeIndex;

                return (
                  <div
                    key={tab.id}
                    className={`
                h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium
                transition-all ${isActive
                        ? 'bg-accent text-white'
                        : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-surface border border-border text-text-2'
                      }
              `}
                  >
                    {tab.id}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Web View Stepper*/}
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
              <div className="absolute left-5 top-0 w-0.5 bg-accent" style={{ height: `${progress}%` }} />
              <div className="absolute left-5 top-0 w-0.5 bg-green-400" style={{ height: `${completedProgress}%` }} />
            </div>

            <div className="flex flex-col gap-8">
              {TABS.map((tab, index) => {
                const isActive = tab.key === activeTab;
                const isCompleted = index < TABS.findIndex((t) => t.key === activeTab);
                const activeClass = 'bg-accent border-accent text-white';
                const completedClass = 'bg-green-500 border-green-500 text-white';

                const className = isActive
                  ? activeClass
                  : isCompleted
                    ? completedClass
                    : 'bg-surface border-border text-text-3';

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
                      <span className="mb-px text-[18px]">{tab.id}</span>
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
      <form onSubmit={handleSubmit(submitHandler)} className="xl:py-16 px-[4%] w-full">
        <Component control={control} handleStateChange={handleStateChange} state={state} />
        <div className="flex flex-wrap sm:flex-nowrap gap-y-3 gap-x-4 w-full mt-5">
          {activeTab !== 'account_type' && (
            <button
              onClick={handleBack}
              type={activeTab === 'submit' ? 'submit' : 'button'}
              className="btn-outlined w-full h-9! sm:h-9.5! sm:text-[16px]!"
            >
              Back
            </button>
          )}
          <button
            onClick={tabChangeHandler}
            type={btnType}
            className="btn-primary w-full h-9! sm:h-9.5! sm:text-[15px]!"
          >
            {btnLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
