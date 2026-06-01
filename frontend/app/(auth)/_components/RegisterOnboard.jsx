import Link from 'next/link';
import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { GrApple } from 'react-icons/gr';

import TitleCard from '@/components/common/TitleCard';
import Field from '@/components/ui/DynamicForm/Field';
import { colSpanMap } from '@/lib/utils/constants';

const onBoardSchema = [
  {
    id: 1,
    name: 'email',
    label: 'Email',
    type: 'string',
    colSpan: 12,
    required: true,
    placeholder: 'your@email.com',
    widget: 'email'
  },
  {
    id: 2,
    name: 'username',
    label: 'Username',
    type: 'string',
    colSpan: 12,
    required: true,
    placeholder: 'Choose a username',
    widget: 'text'
  },
  {
    id: 3,
    name: 'password',
    label: 'Password',
    type: 'string',
    colSpan: 6,
    required: true,
    placeholder: 'Min 6 mixed characters',
    widget: 'password'
  },
  {
    id: 4,
    name: 'c_password',
    label: 'Repeat password',
    type: 'string',
    colSpan: 6,
    required: true,
    placeholder: 'Retype your password...',
    widget: 'password'
  }
];

const RegisterOnboard = ({ control, handleNext }) => {
  return (
    <div className="w-full mt-2 xl:mt-0">
      <TitleCard
        title="Create your account"
        desc="Enter your email or phone to get started, or sign up with a social account."
      />
      <div className="grid grid-cols-12 gap-y-3 sm:gap-y-4 gap-x-5 mt-4">
        {onBoardSchema.map((field) => (
          <div key={field.id} className={`${colSpanMap[field.colSpan || 12]}`}>
            <Field field={{ ...field, control: control }} />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="btn-primary mt-5 md:mt-6 w-full h-9! sm:h-9.5! sm:text-[15px]!"
        onClick={handleNext}
      >
        Continue
      </button>
      <div className="flex-center gap-4 my-6 text-sm text-text-2 w-full">
        <p className="w-full h-px bg-border-2 rounded"></p>
        <p className="min-w-fit">Or sign up with</p>
        <p className="w-full h-px bg-border-2 rounded"></p>
      </div>
      <div className="flex flex-col gap-5 w-full mt-6">
        <div>
          <button
            type="button"
            className="btn-outlined bg-surface! gap-2 h-9! sm:h-9.5! sm:text-[15px]! text-gray-400 w-full hover:text-white!"
          >
            <FaPhone className="text-lg rotate-90" />
            Continue with phone
          </button>
        </div>
        <div className="flex-center gap-2 sm:gap-4">
          <button
            type="button"
            className="btn-outlined gap-2 h-9! sm:h-9.5! sm:text-[15px]! text-gray-400 w-full"
          >
            <FcGoogle className="text-lg" />
            Google
          </button>
          <button
            type="button"
            className="btn-outlined gap-2 h-9! sm:h-9.5! sm:text-[15px]! text-gray-400 w-full"
          >
            <FaSquareFacebook className="text-blue-500 text-[18px]" />
            Facebook
          </button>
          <button
            type="button"
            className="btn-outlined gap-2 h-9! sm:h-9.5! sm:text-[15px]! text-gray-400 w-full"
          >
            <GrApple className="text-[18px]" />
            Apple
          </button>
        </div>
      </div>
      <div>
        <div className="flex-center gap-2 py-4 text-text-2 text-sm">
          Already have an account?
          <Link href={'/login'} className="text-accent-2 font-medium text-[15px]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterOnboard;
