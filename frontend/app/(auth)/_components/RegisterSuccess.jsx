import Link from 'next/link';
import React from 'react';

const RegisterSuccess = ({ getValues }) => {
  const formValues = getValues();
  return (
    <div className="w-full flex-center flex-col h-full min-h-[82dvh]">
      <div className="flex-center h-20 aspect-square bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {[
          'bg-red-500',
          'bg-orange-500',
          'bg-yellow-500',
          'bg-green-500',
          'bg-blue-500',
          'bg-purple-500'
        ].map((c, index) => (
          <div key={index} className={`h-2 w-2 rounded-full ${c}`} />
        ))}
      </div>
      <div className="text-accent border border-accent py-1 px-3 text-sm rounded-full bg-accent/10 mt-6 flex items-center gap-2">
        {formValues.email} - Verified!
      </div>
      <h2 className="text-2xl font-semibold mt-4">Registration Successful!</h2>
      <p className="text-center text-text-2 mt-2">
        Welcome to TruLink! Your account has been created successfully.
      </p>
      <Link href="/discover" className="btn-primary mt-6 h-9! sm:h-10! text-[15px]!">
        Start exploring TruLink
      </Link>
    </div>
  );
};

export default RegisterSuccess;
