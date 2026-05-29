import React from 'react';
import { FaCamera } from 'react-icons/fa';

import TitleCard from '@/components/common/TitleCard';
import String from '@/components/ui/DynamicForm/String/String';

const RegisterProfile = ({ control }) => {
  return (
    <div className="w-full">
      <TitleCard
        title="Set up your profile"
        desc="Make your TruLink profile yours. You can always update this later."
      />
      <div className="mt-5 mb-2 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <div className="flex gap-4 max-w-full! card p-6">
              <div className="min-w-20 min-h-20 rounded-xl bg-surface-2 flex-center border-2 border-dashed border-border">
                <FaCamera className="text-text-2 text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-text-2 text-sm">Click to select photo</span>
                <div className="mt-3 border-t border-border flex-center gap-2 w-full pt-2">
                  {[
                    'bg-violet-700',
                    'bg-cyan-700',
                    'bg-orange-700',
                    'bg-yellow-700',
                    'bg-green-700'
                  ].map((a, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className={`${a} h-8 w-8 rounded-full flex-center text-xs`}
                    >
                      AU
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <String
              fieldProp={{
                control,
                name: 'username',
                label: 'Username',
                type: 'string',
                required: true,
                placeholder: 'your username?',
                widget: 'text'
              }}
            />
            <p className="text-xs text-text-3 mt-2">
              trulink.online/username — only letters, numbers and underscores.
            </p>
            <div className="mt-3 flex-1 flex w-full">
              <String
                fieldProp={{
                  control,
                  name: 'bio',
                  label: 'Bio',
                  type: 'string',
                  required: false,
                  placeholder: 'Tell us about yourself...',
                  widget: 'textarea',
                  className: 'w-full!'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProfile;
