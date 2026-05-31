import React, { useState } from 'react';
import Field from '@/components/ui/DynamicForm/Field';
import { colSpanMap } from '@/lib/utils/helpers';
import { useForm } from 'react-hook-form';
import { MdVisibility } from 'react-icons/md';

const settingsSchema = [
  {
    id: 1,
    name: 'settings.show_location',
    label: 'Show Online Status',
    info: 'Let others see when you are active',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 2,
    name: 'settings.appear_in_search',
    label: 'Read Receipts',
    info: 'Show when you have read messages',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 3,
    name: 'settings.notifications',
    label: 'Appear in Searches',
    info: 'Let people find you by username',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 4,
    name: 'settings.is_online',
    label: 'Anonymous Mode',
    info: 'Hide your identity in chat sessions',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 5,
    name: 'settings.is_online',
    label: 'Block Screenshots',
    info: 'Prevents others from screenshooting chats',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  }
];

const PrivacySettings = () => {
  const { control } = useForm()
  const [visibility, setVisibility] = useState('');
  const buttonTypes = [
    { label: 'Everyone', key: 'everyone' },
    { label: 'Friends', key: 'friends' },
    { label: 'Private', key: 'private' }
  ];

  return (
    <div>
      <h1 className="font-medium text-xl">Privacy</h1>

      <h3 className="text-text-3 text-sm">Control who sees what about you.</h3>

      <div className="grid grid-cols-12 gap-y-3 sm:gap-y-3 gap-x-5 w-full mt-8 mb-2 max-w-full!">
        <div className="border-b border-border-2 col-span-12 pb-3 flex justify-between">
          <div>
            <p className="text-sm text-white/70 cursor-pointer select-none">Profile Visibility</p>
            <p className="text-[10px] sm:text-sm text-text-3">Who can view your full profile</p>
          </div>
          <div className='flex gap-2'>
            {
              buttonTypes.map((btn) => (
                <button
                  onClick={() => setVisibility(btn.key)}
                  className={`btn-outlined ${visibility === btn.key ? 'bg-accent text-text hover:bg-accent' : ''}`}>
                  {btn.label}+
                </button>
              ))
            }
          </div>
        </div>
        {settingsSchema.map((field, index) => {
          return (
            <div
              key={index}
              className={`${colSpanMap[field.colSpan || 12]} border-b border-border last:border-none pb-3 last:pb-0`}
            >
              <Field field={{ ...field, control }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacySettings;
