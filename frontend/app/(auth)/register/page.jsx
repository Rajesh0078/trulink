'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AccountType from '../_components/AccountType';
import RegisterDetails from '../_components/RegisterDetails';

import LOGO from '@/public/icons/flame.svg';

const TABS = [
  { id: 1, title: 'Account type', desc: 'Anonymous or Permanent', key: 'account_type' },
  { id: 2, title: 'Your details', desc: 'Name, email and password', key: 'details' },
  { id: 3, title: 'Profile setup', desc: 'Photo, bio and interests', key: 'profile' },
  { id: 4, title: 'Privacy & consent', desc: 'Control your visibility', key: 'submit' }
];

const componentMap = {
  account_type: AccountType,
  details: RegisterDetails
};

const Register = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      terms_of_use: true,
      use_anonymous_data: false,
      display_name: ''
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
      setActiveTab('details');
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
  if (state.account_type === 'guest') {
    btnLabel = 'Continue as Anonymous';
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

  return (
    <div className="flex h-full">
      <div className="w-[30%] min-w-100 px-[3%] py-16 bg-surface border-r border-border flex flex-col justify-between">
        <div>
          <Link href={'/'} className="flex items-center gap-1 w-full">
            <div>
              <Image src={LOGO} alt="Flame" height={40} />
            </div>
            <span className="text-2xl colored-text mt-1">TruLink</span>
          </Link>
          <div className="mt-10 relative">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-border" />

            <div className="flex flex-col gap-6">
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
                        relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2
                        transition-all duration-300 text-2xl
                        ${className}
                      `}
                    >
                      <span className="mb-px">{tab.id}</span>
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
          <Link href={'/login'} className="text-accent-3 text-[15px]">
            Sign in
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className="py-16 px-[4%] w-full">
        <Component control={control} handleStateChange={handleStateChange} state={state} />
        <div className="flex gap-4 w-full">
          {activeTab !== 'account_type' && (
            <button
              onClick={() => setActiveTab('account_type')}
              type={activeTab === 'submit' ? 'submit' : 'button'}
              className="btn-outlined w-full mt-5 h-9.5! text-[16px]!"
            >
              Back
            </button>
          )}
          <button
            onClick={tabChangeHandler}
            type={activeTab === 'submit' ? 'submit' : 'button'}
            className="btn-primary w-full mt-5 h-9.5! text-[16px]!"
          >
            {btnLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
