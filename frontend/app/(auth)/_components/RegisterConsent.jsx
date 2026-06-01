import React from 'react';

import TitleCard from '@/components/common/TitleCard';
import Field from '@/components/ui/DynamicForm/Field';
import { colSpanMap } from '@/lib/utils/constants';

const settingsSchema = [
  {
    id: 1,
    name: 'settings.show_location',
    label: 'Show my location',
    info: 'Allow nearby users to see your approximate location and discover you based on distance.',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 2,
    name: 'settings.appear_in_search',
    label: 'Appear in search',
    info: 'Make your profile visible in discovery, search results, and recommendations.',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 3,
    name: 'settings.notifications',
    label: 'Push notifications',
    info: 'Receive alerts for new messages, friend requests, matches, and important account activity.',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 4,
    name: 'settings.is_online',
    label: 'Online status visible',
    info: 'Let other users see when you are online and when you were last active.',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  }
];

const consentSchema = [
  {
    id: 1,
    name: 'settings.terms_of_use',
    label:
      'I agree to the Terms of Service and Privacy Policy. I confirm I am at least 13 years old.',
    type: 'boolean',
    colSpan: 12,
    widget: 'checkbox'
  },
  {
    id: 2,
    name: 'settings.subscribe_updates',
    label: 'Send me occasional product updates and announcements. You can unsubscribe anytime.',
    type: 'boolean',
    colSpan: 12,
    widget: 'checkbox'
  },
  {
    id: 3,
    name: 'settings.use_anonymous_data',
    label: 'Allow TruLink to use anonymised data to improve recommendations and matching.',
    type: 'boolean',
    colSpan: 12,
    widget: 'checkbox'
  }
];

const RegisterConsent = ({ control, handlePrev }) => {
  return (
    <div className="w-full">
      <TitleCard
        title="Privacy & Consent"
        desc="Control who can see your profile and how TruLink uses your data."
      />
      <div className="grid grid-cols-12 gap-y-3 sm:gap-y-3 gap-x-5 w-full mt-5 mb-2 card max-w-full!">
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
      <div className="grid grid-cols-12 gap-y-3 sm:gap-y-3 gap-x-5 w-full mt-5 mb-2 px-1">
        {consentSchema.map((field, index) => {
          return (
            <div key={index} className={`${colSpanMap[field.colSpan || 12]}`}>
              <Field field={{ ...field, control }} />
            </div>
          );
        })}
      </div>
      <div className="mt-5 md:mt-6 w-full flex gap-3">
        <button
          type="button"
          className="btn-outlined bg-surface w-full h-9! sm:h-9.5! sm:text-[15px]!"
          onClick={handlePrev}
        >
          Back
        </button>
        <button type="submit" className="btn-primary w-full h-9! sm:h-9.5! sm:text-[15px]!">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default RegisterConsent;
