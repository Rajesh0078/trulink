import Image from 'next/image';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import TitleCard from '@/components/common/TitleCard';
import Field from '@/components/ui/DynamicForm/Field';
import { uploadAvatar } from '@/lib/actions/fileActions';
import { colSpanMapRes, GENDER_OPTIONS, interests } from '@/lib/utils/constants';

const profileSchema = [
  {
    id: 1,
    name: 'first_name',
    label: 'First name',
    type: 'string',
    colSpan: 6,
    required: false,
    placeholder: 'First name',
    widget: 'text'
  },
  {
    id: 2,
    name: 'last_name',
    label: 'Last name',
    type: 'string',
    colSpan: 6,
    required: false,
    placeholder: 'Last name',
    widget: 'text'
  },
  {
    id: 3,
    name: 'display_name',
    label: 'Display name',
    type: 'string',
    colSpan: 6,
    required: true,
    placeholder: 'Display name',
    widget: 'text'
  },
  {
    id: 4,
    name: 'gender',
    label: 'Gender',
    type: 'select',
    colSpan: 6,
    required: true,
    placeholder: 'Enter Last Name',
    options: GENDER_OPTIONS
  }
];

const RegisterProfileV1 = ({ control, watch, setValue, handleNext, handlePrev, getValues }) => {
  const selectedInterests = watch('interests') || [];
  const [path, setPath] = useState(getValues('avatar') || '');
  const [uploading, setUploading] = useState(false);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const { url } = await uploadAvatar(file);

      setValue('avatar', url);
      setPath(url);
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full mt-2 xl:mt-0 pb-6">
      <TitleCard
        title="Set up your profile"
        desc="Add your name and a few interests so others can find and connect with you."
      />
      <div className="card p-5 my-6 max-w-full! rounded-xl flex-center justify-start gap-4">
        <label
          htmlFor="profile_photo"
          className={`cursor-pointer flex items-center gap-4 ${uploading ? 'pointer-events-none opacity-70' : ''}`}
        >
          {uploading ? (
            <div className="min-w-14 w-14 h-14 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
          ) : path ? (
            <Image
              src={path}
              alt="avatar"
              width={56}
              height={56}
              className="min-w-14 w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="min-w-14 w-14 h-14 rounded-full border-dashed border-2 bg-surface-2 flex items-center justify-center text-gray-500 text-3xl">
              <FaUser className="text-[18px]" />
            </div>
          )}

          <div>
            <p className="text-text-2">{uploading ? 'Uploading...' : 'Upload a profile photo'}</p>
            <p className="text-text-3 text-xs">JPG, PNG or GIF · max 5MB</p>
          </div>
        </label>

        <input
          id="profile_photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onUpload}
          disabled={uploading}
        />
      </div>
      <div className="grid grid-cols-12 gap-y-3 sm:gap-y-4 gap-x-5 w-full">
        {profileSchema.map((field) => (
          <div key={field.id} className={`${colSpanMapRes[field.colSpan || 12]}`}>
            <Field field={{ ...field, control }} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="uppercase flex text-text-3 mb-1 text-sm">Pick a few interests</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {interests.map(({ key, name }) => {
            const isActive = selectedInterests.includes(key);
            return (
              <button
                type="button"
                key={key}
                onClick={() => {
                  const updated = isActive
                    ? selectedInterests.filter((item) => item !== key)
                    : [...selectedInterests, key];

                  setValue('interests', updated, {
                    shouldDirty: true,
                    shouldValidate: true
                  });
                }}
                className={`btn-outlined w-fit rounded-full ${isActive ? 'bg-accent/20 hover:bg-accent/20 text-accent-2' : ''}`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-5 md:mt-6 w-full flex gap-3">
        <button
          type="button"
          className="btn-outlined bg-surface w-full h-9! sm:h-9.5! sm:text-[15px]!"
          onClick={handlePrev}
        >
          Back
        </button>
        <button
          type="submit"
          onClick={handleNext}
          className="btn-primary w-full h-9! sm:h-9.5! sm:text-[15px]!"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RegisterProfileV1;
