import React from 'react';
import { Controller } from 'react-hook-form';

const Boolean = ({ fieldProp }) => {
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
            {fieldProp.widget === 'checkbox' && (
              <div className="flex items-start gap-2">
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
                    className="text-text-3 text-[13px] cursor-pointer flex items-center select-none"
                  >
                    {/* {fieldProp.required && <span className="text-red-600 me-1">*</span>} */}

                    {fieldProp.label}
                  </label>
                )}
              </div>
            )}

            {fieldProp.widget === 'toggle' && (
              <div className="flex-between gap-3">
                {fieldProp.label && (
                  <label
                    htmlFor={fieldProp.name}
                    className="text-sm text-white/70 cursor-pointer select-none"
                  >
                    {fieldProp.required && <span className="text-red-600 me-1">*</span>}
                    {fieldProp.label}
                    <p className="text-[10px] sm:text-sm text-text-3">{fieldProp.info}</p>
                  </label>
                )}

                <button
                  type="button"
                  id={fieldProp.name}
                  onClick={() => field.onChange(!field.value)}
                  className={`relative  border border-border flex-center h-6 min-w-11 rounded-full transition-colors duration-400 ${field.value ? 'bg-accent' : 'bg-surface-2'}`}
                >
                  <span
                    className={`h-4 w-4 transform rounded-full transition-transform duration-300 bg-white/80 ${field.value ? 'translate-x-2.25' : '-translate-x-2.25'}`}
                  />
                </button>
              </div>
            )}

            {fieldState.error && (
              <span className="text-xs text-red-400">{fieldState.error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default Boolean;
