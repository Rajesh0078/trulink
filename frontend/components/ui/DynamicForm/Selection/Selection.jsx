import React, { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { HiMiniInbox } from 'react-icons/hi2';
import { IoChevronDown } from 'react-icons/io5';

const Selection = ({ fieldProp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Controller
      control={fieldProp.control}
      name={fieldProp.name}
      rules={{
        required: fieldProp.required ? 'This field is required!' : false
      }}
      render={({ field, fieldState }) => {
        const selectedVal = fieldProp?.options?.find((o) => o.key === field.value) || {};
        return (
          <div className="w-full h-full">
            {fieldProp.label && (
              <label htmlFor={fieldProp.id} className="uppercase flex text-text-3 mb-1 text-sm">
                <div className="text-red-600 me-1">{fieldProp.required && '*'}</div>
                {fieldProp.label}
              </label>
            )}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="custom-select w-full p-3 rounded flex justify-between items-center border border-border"
              >
                <span className={`${field.value ? 'text-white' : 'text-text-3'}`}>
                  {selectedVal?.label || 'Select an option'}
                </span>
                <IoChevronDown className="text-text-3 text-xl" />
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-0.5 py-2 w-full bg-surface border border-border-2 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                  {fieldProp.options?.length > 0 &&
                    fieldProp.options?.map((option) => (
                      <button
                        type="button"
                        key={option.key}
                        className={`w-full text-left mb-0.5 px-4 py-1 hover:bg-surface-2 text-sm text-text-3 ${selectedVal.key === option.key && 'bg-surface-2 text-text!'}`}
                        onClick={() => {
                          field.onChange(option.key);
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  {!fieldProp.options?.length && (
                    <div className="p-4 flex-center flex-col text-text-3 gap-1 min-h-30 text-sm">
                      <HiMiniInbox className="text-text-3 text-3xl" />
                      No data
                    </div>
                  )}
                </div>
              )}
            </div>
            {fieldState.error && (
              <p className="text-red-400 text-[12px] w-full text-start">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default Selection;
