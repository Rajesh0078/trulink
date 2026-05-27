'use client';
import React from 'react';
import { Controller } from 'react-hook-form';

const String = ({ fieldProp }) => {
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
              <>
                <input
                  {...field}
                  placeholder={fieldProp.placeholder}
                  type={fieldProp.widget}
                  value={field.value || ''}
                  autoComplete="OFF"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  disabled={fieldProp.disabled}
                  className={`${fieldState.error ? 'border-red-400! focus:ring-0! shake' : 'border-border'}`}
                />
              </>
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
