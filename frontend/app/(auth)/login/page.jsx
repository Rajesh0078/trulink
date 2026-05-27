'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsEmojiWink } from 'react-icons/bs';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { GrApple } from 'react-icons/gr';
import { IoIosUnlock } from 'react-icons/io';

import DynamicFrom from '@/components/ui/DynamicForm/DynamicFrom';
import { loginAction } from '@/lib/actions/authActions';
import LOGO from '@/public/icons/flame.svg';

const Login = () => {
  const [acitveTab] = useState('email');
  const forgotpasswordHanlder = () => {
    alert('ghgf');
  };
  const loginSchema = [
    {
      id: 1,
      name: 'email',
      label: 'Email',
      type: 'string',
      colSpan: 12,
      required: true,
      placeholder: 'Enter email',
      widget: 'email'
    },
    {
      id: 2,
      name: 'password',
      label: 'Password',
      type: 'string',
      colSpan: 12,
      required: true,
      placeholder: 'Enter password',
      widget: 'password'
    },
    {
      id: 3,
      name: 'remember',
      label: 'Remember Me',
      type: 'boolean',
      colSpan: 6,
      required: false,
      widget: 'checkbox'
    },
    {
      id: 4,
      label: 'Forgot password?',
      type: 'button',
      colSpan: 6,
      variant: 'outlined',
      btnClass: 'text-end w-full',
      labelClass: 'text-accent text-sm',
      onClick: forgotpasswordHanlder
    }
  ];
  return (
    <div className="w-full h-full flex z-100">
      <div className="h-full w-1/2 bg-surface border-r border-border hidden lg:flex-between py-22 flex-col px-[5%]">
        <Link href={'/'} className="flex items-center gap-1 w-full">
          <div>
            <Image src={LOGO} alt="Flame" height={36} />
          </div>
          <span className="text-2xl colored-text mt-1">TruLink</span>
        </Link>
        <div>
          <div className="w-full mt-10 text-text-2">
            TruLink is a next-generation social discovery platform where anonymity meets
            authenticity. Browse real people from across the globe — no judgements, no filters on
            who you are. Whether you&apos;re looking for a late-night philosophical debate, a fellow
            gamer to team up with, or just someone to share your day with, TruLink&apos;s
            intelligent matching engine surfaces the right stranger at the right moment.
          </div>
          <div className="flex gap-4 mt-5">
            <div className="card p-6!">
              <div className="h-12 w-12 bg-purple-400/20 rounded-lg flex-center">
                <BsEmojiWink className="text-2xl text-purple-200" />
              </div>
              <div className="mt-3">Fully Anonymous</div>
              <div className="text-text-2 text-xs mt-2">
                No signup needed. Jump in instantly with zero personal info required. Your identity,
                your choice.
              </div>
            </div>
            <div className="card p-6!">
              <div className="h-12 w-12 bg-orange-400/20 rounded-lg flex-center">
                <IoIosUnlock className="text-2xl text-orange-200" />
              </div>
              <div className="mt-3">Unlock More</div>
              <div className="text-text-2 text-xs mt-2">
                Upgrade to a permanent account for chat history, friend lists, custom profiles, and
                exclusive features.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full lg:w-1/2 flex pt-16 sm:pt-21 flex-col px-[8%]">
        <div className="w-full">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-text-2 mt-1 mb-9">Sign in to your TruLink account.</p>
        </div>
        <div className="w-full">
          <DynamicFrom submitLabel="Login" schema={loginSchema} submitHandler={loginAction} />
        </div>
        <div className="flex-center gap-4 my-6 text-sm text-text-2 w-full">
          <p className="w-full h-px bg-border-2 rounded"></p>
          <p className="min-w-fit">Or Sign in with {acitveTab === 'phone' ? 'Phone' : 'Email'}</p>
          <p className="w-full h-px bg-border-2 rounded"></p>
        </div>
        <div className="flex gap-2 sm:gap-4 w-full mt-0">
          <button className="btn-outlined sm:text-[16px] gap-2 sm:h-10! text-gray-400 w-full">
            <FcGoogle className="text-lg" />
            Google
          </button>
          <button className="btn-outlined sm:text-[16px] gap-2 sm:h-10! text-gray-400 w-full">
            <FaSquareFacebook className="text-blue-500 text-[18px]" />
            Facebook
          </button>
          <button className="btn-outlined sm:text-[16px] gap-2 sm:h-10! text-gray-400 w-full">
            <GrApple className="text-[18px]" />
            Apple
          </button>
        </div>
        <div className="flex-center mt-4 text-sm gap-1.5 text-text-2">
          Don&apos;t have an account?
          <Link href={'/register'} className="text-[15px] text-accent-2">
            Create new account ↗
          </Link>
        </div>
        <div className="mt-4 flex flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-4 mt-0 text-[15px] text-text-3">
            <button className="hover:text-accent transition-colors">Terms</button>

            <span>|</span>

            <button className="hover:text-accent transition-colors">Privacy</button>

            <span>|</span>

            <button className="hover:text-accent transition-colors">Support</button>
          </div>
          <p className="text-[13px] text-text-3 mt-2">© 2026 TruLink. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
