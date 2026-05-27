'use client';

import React, { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';

import Avatar from '@/components/ui/Avatar/Avatar';
import DynamicFrom from '@/components/ui/DynamicForm/DynamicFrom';

const profileSchema = [
  {
    id: 2,
    name: 'first_name',
    label: 'First Name',
    type: 'string',
    colSpan: 4,
    required: true,
    placeholder: 'Enter first name',
    widget: 'text'
  },
  {
    id: 3,
    name: 'last_name',
    label: 'Last Name',
    type: 'string',
    colSpan: 4,
    required: false,
    placeholder: 'Enter last name',
    widget: 'text'
  },
  {
    id: 1,
    name: 'display_name',
    label: 'Display Name',
    type: 'string',
    colSpan: 4,
    required: false,
    placeholder: 'Enter display name',
    widget: 'text'
  },
  {
    id: 4,
    name: 'bio',
    label: 'Bio',
    type: 'string',
    colSpan: 12,
    required: false,
    placeholder: 'Enter bio',
    widget: 'textarea'
  }
];

const ProfileSettings = ({ user }) => {
  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      alert('Only JPG and PNG files are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h1 className="font-medium">Profile Settings</h1>

      <h3 className="text-text-3 text-sm">Update your public-facing information</h3>

      <div className="bg-surface-2 border border-border rounded-[14px] p-3 sm:p-4 sm:px-5 mb-4 sm:mb-6 mt-4 sm:mt-6 flex items-center gap-3 sm:gap-5">
        <Avatar
          customAvatar={profileImage}
          className="min-h-12 min-w-12 flex-center sm:h-16 sm:w-16 custom-gradient"
          labelClass="sm:text-2xl"
        />

        <div className="flex flex-col gap-2">
          <p className="text-text-2 text-xs sm:text-[15px]">Profile photo · JPG or PNG, max 5MB</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUploadClick}
              className="btn-outlined bg-surface! flex items-center gap-2"
            >
              <FaUpload />
              Upload
            </button>

            <button
              type="button"
              onClick={handleRemoveImage}
              className="btn-outlined bg-surface! flex gap-2 text-red-400"
            >
              Remove
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div>
        <DynamicFrom
          schema={profileSchema}
          submitLabel={'Save Changes'}
          defaultValues={{
            bio: user?.bio,
            email: user?.email,
            display_name: user?.display_name,
            username: user?.username,
            first_name: user?.first_name,
            last_name: user?.last_name
          }}
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
