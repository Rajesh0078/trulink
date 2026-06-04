import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineShieldCheck } from 'react-icons/hi2';
import { toast } from 'react-toastify';

import TitleCard from '@/components/common/TitleCard';
import { registerVerify } from '@/lib/actions/authActions';

const RegisterOtp = ({ getValues, handlePrev, handleNext }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formValues = getValues();
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);

  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    const payload = {
      email: formValues.email,
      otp: Number(otp.join(''))
    };
    const res = await registerVerify(payload);
    console.log(res);
    if (res && !res.success) {
      toast.error(res.error);
    }
    if (res && res.success) {
      handleNext();
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex-center gap-2 mb-6 mt-5 xl:mt-0 border-violet-500 bg-violet-500/10 border rounded-full py-1.5 px-3 w-fit">
        <div className="h-2 w-2 rounded-full bg-violet-600 animate-pulse"></div>
        <span className="uppercase text-sm text-violet-500">Identity verification</span>
      </div>
      <TitleCard
        title="Check your inbox"
        desc={`Enter the 6-digit code sent to ${formValues.email}. It's valid for 5 minutes.`}
      />
      <div className="w-full flex flex-col gap-5 mt-5 md:mt-10">
        <div className="flex gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-full h-14! rounded text-center text-2xl! pb-1 border ${otp[index].trim().length ? 'border-accent! border-b-4!' : 'border-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 md:mt-6 w-full flex gap-3">
        <button
          type="button"
          className="btn-outlined bg-surface w-full h-9! sm:h-9.5! sm:text-[15px]!"
          onClick={handlePrev}
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          disabled={!otp.every((e) => e.length) || isSubmitting}
          type="button"
          className="btn-primary w-full h-9! sm:h-9.5! sm:text-[15px]!"
          onClick={submitHandler}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Verifying...
            </div>
          ) : (
            'Verify OTP'
          )}
        </button>
      </div>
      <div className="mt-4 w-full flex-between gap-3">
        <p className="text-sm text-text-2">Didn&apos;t receive the code?</p>
        {timer > 0 ? (
          <div className="text-sm text-text-2 mt-1">
            Resend code{' '}
            {timer > 0 &&
              `in ${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(
                2,
                '0'
              )}`}
          </div>
        ) : (
          <button type="button" className="text-sm text-accent mt-1" disabled={isSubmitting}>
            Resend code
          </button>
        )}
      </div>
      <div className="flex gap-2 mt-4 text-xs sm:text-sm items-start text-green-500 border-green-500 bg-green-500/10 border rounded p-3">
        <HiOutlineShieldCheck className="text-xl min-w-5" />
        This code confirms your identity. Never share it with anyone — TruLink will never ask for
        it.
      </div>
    </div>
  );
};

export default RegisterOtp;
