'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import RegisterConsent from '../_components/RegisterConsent';
import RegisterOnboard from '../_components/RegisterOnboard';
import RegisterProfileV1 from '../_components/RegisterProfileV1';
import RegisterSteps from '../_components/RegisterSteps';

const DEFAULT_VALUES = {
  account_type: 'permanent',
  email: '',
  password: '',
  c_password: '',
  gender: '',
  display_name: '',
  username: '',
  interests: [],
  settings: {
    terms_of_use: true
  }
};

const componentMap = {
  1: RegisterOnboard,
  2: RegisterProfileV1,
  3: RegisterConsent
};

const STEP_FIELDS = {
  1: ['email', 'username', 'password', 'c_password'],
  2: ['display_name', 'gender'],
  3: ['settings.terms_of_use']
};

const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    c_password: z.string(),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    display_name: z.string().min(2, 'Display name is required'),
    gender: z.string().min(1, 'Please select a gender'),
    interests: z.array(z.string()),
    settings: z.object({
      terms_of_use: z.literal(true, {
        errorMap: () => ({ message: 'You must agree to the terms of use' })
      }),
      show_location: z.boolean().optional(),
      appear_in_search: z.boolean().optional(),
      notifications: z.boolean().optional(),
      is_online: z.boolean().optional(),
      subscribe_updates: z.boolean().optional(),
      use_anonymous_data: z.boolean().optional()
    })
  })
  .refine((data) => data.password === data.c_password, {
    message: 'Passwords do not match',
    path: ['c_password']
  });

const Page = () => {
  const { control, handleSubmit, trigger, watch, setValue } = useForm({
    defaultValues: DEFAULT_VALUES,
    shouldUnregister: false,
    resolver: zodResolver(registerSchema)
  });
  const [state, setState] = useState({
    currentTab: 1
  });

  const handleStateChange = (key, val) => {
    setState((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const submitHandler = (data) => {
    console.log(data);
  };

  const handleNext = async () => {
    const fields = STEP_FIELDS[state.currentTab];
    const isValid = await trigger(fields, {
      shouldFocus: true
    });

    if (!isValid) {
      return;
    }

    moveStep(state.currentTab + 1);
  };

  const handlePrev = () => {
    moveStep(state.currentTab - 1);
  };

  const moveStep = (step) => {
    setState((prev) => ({
      ...prev,
      currentTab: step
    }));
  };

  const RenderedComponent = componentMap[state.currentTab];
  return (
    <div className="h-full flex flex-col xl:flex-row">
      <RegisterSteps currentTab={state.currentTab} />
      <div className="w-full h-full px-4 sm:px-10 md:px-16 xl:py-16 xl:px-[10%]">
        <form onSubmit={handleSubmit(submitHandler)}>
          <RenderedComponent
            handleStateChange={handleStateChange}
            control={control}
            handleNext={handleNext}
            handlePrev={handlePrev}
            watch={watch}
            setValue={setValue}
          />
        </form>
      </div>
    </div>
  );
};
export default Page;
