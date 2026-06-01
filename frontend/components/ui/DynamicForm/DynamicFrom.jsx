'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Field from './Field';

import { colSpanMap, colSpanMapRes } from '@/lib/utils/constants';

const DynamicFrom = ({ defaultValues, submitHandler, schema, submitLabel }) => {
  const { handleSubmit, control, formState, reset } = useForm({
    progressive: true,
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-12 gap-y-3 sm:gap-y-4 gap-x-5 items-center"
    >
      {schema.map((field, index) => {
        const canSkipResponsive = field.type === 'boolean' || field.type === 'button';
        return (
          <div
            key={index}
            className={`${canSkipResponsive ? colSpanMap[field.colSpan || 12] : colSpanMapRes[field.colSpan || 12]}`}
          >
            <Field
              field={{ ...field, control, disabled: formState.isSubmitting || field.disabled }}
            />
          </div>
        );
      })}
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full col-span-12 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:translate-y-0! btn-primary! h-9! sm:h-10! text-[15px]! mt-1.5"
      >
        {formState.isSubmitting ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </div>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default DynamicFrom;
