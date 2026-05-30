import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { GrApple } from 'react-icons/gr';
import { IoCall } from 'react-icons/io5';

import TitleCard from '@/components/common/TitleCard';
import Boolean from '@/components/ui/DynamicForm/Boolean/Boolean';
import String from '@/components/ui/DynamicForm/String/String';

const AccountType = ({ control, handleStateChange, state }) => {
  return (
    <div className="w-full">
      <TitleCard
        title="How do you want to join?"
        desc="Start anonymously for free, or create a permanent account with full social features."
      />
      <div className="flex gap-4 my-6">
        <button
          type="button"
          className={`card p-5 md:p-8 flex flex-col items-start text-start ${state.account_type === 'permanent' && 'border-accent'}`}
          onClick={() => handleStateChange('account_type', 'permanent')}
        >
          <div className="text-[15px]">Permanent</div>
          <p className="text-text-2 text-xs">
            Full account with email. Unlock all social features forever.
          </p>
          <ul className="text-xs sm:text-sm mt-2 sm:mt-3 text-start text-accent">
            <li>Everything in anonymous</li>
            <li>Friends & notifications</li>
            <li>Chat history saved</li>
            <li>Public profile link</li>
          </ul>
        </button>
        <button
          type="button"
          className={`card p-5 md:p-8 flex flex-col items-start text-start ${state.account_type === 'guest' && 'border-accent'}`}
          onClick={() => handleStateChange('account_type', 'guest')}
        >
          <div>Anonymous</div>
          <p className="text-text-2 text-xs">
            No email needed. Chat freely without revealing your identity.
          </p>
          <ul className="text-xs sm:text-sm text-text-3 mt-2 sm:mt-3 text-start">
            <li className="text-accent">Anonymous Chat</li>
            <li className="text-accent">Discover nearby</li>
            <li>No chat history</li>
            <li>No friends list</li>
          </ul>
        </button>
      </div>
      {state.account_type === 'guest' ? (
        <div>
          <div>
            <String
              fieldProp={{
                control,
                name: 'display_name',
                label: 'Display name',
                type: 'string',
                required: true,
                placeholder: 'How should others see you?',
                widget: 'text'
              }}
            />
            <p className="text-xs text-text-3 mt-2">
              This is the only name others will see. You can change it anytime.
            </p>
          </div>
          <div className="mt-4 px-px mb-5">
            <Boolean
              fieldProp={{
                control,
                name: 'settings.terms_of_use',
                widget: 'checkbox',
                label: (
                  <span className="">
                    I agree to the terms of service and privacy policy. I confirm i am at least 18
                    years old.
                  </span>
                ),
                required: true
              }}
            />
            <div className="mt-3">
              <Boolean
                fieldProp={{
                  control,
                  name: 'settings.use_anonymous_data',
                  widget: 'checkbox',
                  label: (
                    <span className="">
                      Allow truLink to use anonymised data to improve recommendations and matching.
                    </span>
                  )
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => handleStateChange('social_type', 'email')}
              className={`btn-outlined w-full! gap-2 h-9.5! flex-center ${state.social_type === 'email' && 'border-accent! text-text!'}`}
            >
              <div className="flex items-center gap-2 min-w-42 ms-8">
                <FaEnvelope className="text-[18px]" />
                Continue with Email
              </div>
              <div></div>
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('social_type', 'phone')}
              className={`btn-outlined w-full! gap-2 h-9.5! flex-center ${state.social_type === 'phone' && 'border-accent! text-text!'}`}
            >
              <div className="flex items-center gap-2 min-w-42 ms-8">
                <IoCall className="text-[18px]" />
                Continue with Phone
              </div>
              <div></div>
            </button>
          </div>
          <div className="w-full flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => handleStateChange('social_type', 'google')}
              className={`btn-outlined w-full! gap-2 h-9.5! flex-center ${state.social_type === 'google' && 'border-accent! text-text!'}`}
            >
              <div className="flex-center gap-2">
                <FcGoogle className="text-[18px]" />
                Google
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('social_type', 'apple')}
              className={`btn-outlined w-full! gap-2 h-9.5! flex-center ${state.social_type === 'apple' && 'border-accent! text-text!'}`}
            >
              <div className="flex-center gap-2">
                <GrApple className="text-[18px]" />
                Apple
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('social_type', 'facebook')}
              className={`btn-outlined w-full! gap-2 h-9.5! flex-center ${state.social_type === 'facebook' && 'border-accent! text-text!'}`}
            >
              <div className="flex-center gap-2">
                <FaSquareFacebook className="text-[18px] text-blue-600" />
                Facebook
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountType;
