import React from 'react';
import { Controller } from 'react-hook-form';

const CheckBox = ({ fieldProp }) => {
  return (
    <Controller
      control={fieldProp.control}
      name={fieldProp.name}
      rules={{
        required: fieldProp.required ? 'This field is required!' : false
      }}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <input
                {...field}
                checked={field.value || false}
                type="checkbox"
                id={fieldProp.name}
                className="checkbox"
              />

              {fieldProp.label && (
                <label
                  htmlFor={fieldProp.name}
                  className="capitalize text-text-2/60 font-semibold text-sm cursor-pointer flex items-center select-none"
                >
                  {fieldProp.required && <span className="text-red-600 me-1">*</span>}

                  {fieldProp.label}
                </label>
              )}
            </div>

            {fieldState.error && (
              <span className="text-xs text-red-400">{fieldState.error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default CheckBox;
