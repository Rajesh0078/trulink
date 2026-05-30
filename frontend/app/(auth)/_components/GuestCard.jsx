'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

import DynamicFrom from '@/components/ui/DynamicForm/DynamicFrom';
import { guestAction } from '@/lib/actions/authActions';

const GENDER_OPTIONS = [
  { label: 'Male', key: 'male' },
  { label: 'Female', key: 'female' },
  { label: 'Prefer not to say', key: 'others' }
];

const guestSchema = [
  {
    id: 1,
    name: 'display_name',
    label: 'Display Name',
    type: 'string',
    colSpan: 12,
    required: true,
    placeholder: 'How should others see you?',
    widget: 'text'
  },
  {
    id: 2,
    name: 'gender',
    label: 'Gender',
    type: 'select',
    colSpan: 12,
    required: true,
    placeholder: 'Enter Last Name',
    options: GENDER_OPTIONS
  }
];

const GuestCard = () => {
  const navigate = useRouter();
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({
        lat: coords.latitude,
        long: coords.longitude
      });
    });
  }, []);

  const onSubmit = async (data) => {
    const payload = { ...data };
    if (coordinates.lat && coordinates.long) {
      payload.location = {
        type: 'Point',
        coordinates: [coordinates.long, coordinates.lat]
      };
    }
    const response = await guestAction(payload);
    if (response?.success) {
      toast.success(response.message);
      navigate.push('/discover');
    } else {
      toast.error(response.error);
    }
  };
  return (
    <div className="card">
      <div className="bg-surface-2 border border-border rounded-[14px] p-4 mb-4 sm:mb-6">
        <div className="flex items-start justify-baseline gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex-center border-2 border-dashed border-blue-400 bg-linear-to-br from-surface to-surface-2">
            <FaUser className="text-text-3" />
          </div>

          <div className="text-start">
            <p className="font-medium text-text-2 text-sm sm:text-[17px]">Anonymous User</p>
            <p className="text-xs sm:text-sm text-text-3">“Hey 👋 I’m here to chat with anyone!”</p>
          </div>
        </div>
      </div>

      <DynamicFrom
        schema={guestSchema}
        submitHandler={onSubmit}
        submitLabel="Continue as Anonymous"
      />
    </div>
  );
};

export default GuestCard;
