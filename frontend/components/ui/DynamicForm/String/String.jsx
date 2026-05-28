'use client';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

const String = ({ fieldProp }) => {
  const [canViewPass, setCanViewPass] = useState(false);
  const Icon = !canViewPass ? IoIosEye : IoIosEyeOff;

  const passwordViewHandler = () => {
    setCanViewPass((p) => !p);
  };
  return (
    <Controller
      control={fieldProp.control}
      name={fieldProp.name}
      rules={{
        required: fieldProp.required ? 'This field is required!' : false
      }}
      render={({ field, fieldState }) => {
        return (
          <div className="relative text-start">
            {fieldProp.label && (
              <label htmlFor={fieldProp.id} className="capitalize flex text-text-3 mb-1 text-sm">
                <div className="text-red-600 me-1">{fieldProp.required && '*'}</div>
                {fieldProp.label}
              </label>
            )}
            {fieldProp.widget === 'textarea' ? (
              <textarea
                {...field}
                placeholder={fieldProp.placeholder}
                type={fieldProp.widget}
                value={field.value || ''}
                autoComplete="OFF"
                autoCorrect="off"
                autoCapitalize="off"
                rows={6}
                spellCheck={false}
                disabled={fieldProp.disabled}
                className={`min-h-16 ${fieldState.error ? 'border-red-400! focus:ring-0! shake' : 'border-border'}`}
              />
            ) : (
              <div className="relative">
                <input
                  {...field}
                  placeholder={fieldProp.placeholder}
                  type={
                    fieldProp.widget === 'password'
                      ? canViewPass
                        ? 'text'
                        : 'password'
                      : fieldProp.widget
                  }
                  value={field.value || ''}
                  autoComplete="OFF"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  disabled={fieldProp.disabled}
                  className={`${fieldState.error ? 'border-red-400! focus:ring-0! shake' : 'border-border'}`}
                />
                {fieldProp.widget === 'password' && (
                  <button
                    type="button"
                    className="text-text-2 absolute top-1/2 -translate-y-1/2 text-xl right-2.5"
                    onClick={passwordViewHandler}
                  >
                    <Icon />
                  </button>
                )}
              </div>
            )}
            {fieldState.error && (
              <p className="text-red-400 text-[12px]">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default String;
