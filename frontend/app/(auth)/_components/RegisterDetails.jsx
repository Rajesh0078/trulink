import React from 'react';

import TitleCard from '@/components/common/TitleCard';
import Field from '@/components/ui/DynamicForm/Field';
import { colSpanMap, colSpanMapRes } from '@/lib/utils/helpers';

const profileSchema = [
  {
    id: 1,
    name: 'first_name',
    label: 'First name',
    type: 'string',
    colSpan: 6,
    required: true,
    placeholder: 'Enter first name',
    widget: 'text'
  },
  {
    id: 2,
    name: 'last_name',
    label: 'Last name',
    type: 'string',
    colSpan: 6,
    required: false,
    placeholder: 'Enter last name',
    widget: 'text'
  },
  {
    id: 3,
    name: 'email',
    label: 'Email',
    type: 'string',
    colSpan: 12,
    required: true,
    placeholder: 'your@email.com',
    widget: 'email'
  },
  {
    id: 4,
    name: 'password',
    label: 'Password',
    type: 'string',
    colSpan: 12,
    required: true,
    placeholder: 'Min 6 mixed characters...',
    widget: 'password'
  },
  {
    id: 4,
    name: 'c_password',
    label: 'confirm password',
    type: 'string',
    colSpan: 12,
    required: true,
    placeholder: 'Repeat password...',
    widget: 'password'
  }
];

const RegisterDetails = ({ control }) => {
  return (
    <div className="w-full">
      <TitleCard
        title="Your identity"
        desc="Tell us a little about yourself. This information helps personalise your experience."
      />
      <div className="grid grid-cols-12 gap-y-3 sm:gap-y-4 gap-x-5 w-full mt-5 mb-2">
        {profileSchema.map((field, index) => {
          const canSkipResponsive = field.type === 'boolean' || field.type === 'button';
          return (
            <div
              key={index}
              className={`${canSkipResponsive ? colSpanMap[field.colSpan || 12] : colSpanMapRes[field.colSpan || 12]}`}
            >
              <Field field={{ ...field, control }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisterDetails;
