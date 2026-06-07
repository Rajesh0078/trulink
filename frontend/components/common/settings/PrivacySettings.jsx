import React, { useState } from 'react';
import { toast } from 'react-toastify';

import DynamicFrom from '@/components/ui/DynamicForm/DynamicFrom';
import { updateSettingsAction } from '@/lib/actions/settingsAction';
import { useStore } from '@/store/appProvider';

const settingsSchema = [
  {
    id: 1,
    name: 'settings.is_online',
    label: 'Show online status',
    info: 'Let other users see when you are online and when you were last active.',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 2,
    name: 'settings.appear_in_search',
    label: 'Appear in search',
    info: 'Make your profile visible in discovery, search results, and recommendations.',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  },
  {
    id: 3,
    name: 'settings.screenshot_block',
    label: 'Block screenshots',
    info: 'Prevent others from screenshotting chats',
    type: 'boolean',
    colSpan: 12,
    widget: 'toggle'
  }
];

const VISIBILITY_BTNS = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'friends', label: 'Friends' },
  { id: 'private', label: 'Private' }
];

const PrivacySettings = () => {
  const {
    dispatch,
    state: { user }
  } = useStore();
  const [state, setState] = useState({
    settings: {
      visibility: user?.settings?.visibility,
      appear_in_search: user?.settings?.appear_in_search,
      is_online: user?.settings?.is_online,
      screenshot_block: user?.settings?.screenshot_block
    }
  });
  const handleSubmit = async (data) => {
    const payload = {
      settings: {
        ...data.settings,
        visibility: state.settings.visibility
      }
    };
    const res = await updateSettingsAction(payload);
    if (res && !res.success) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      const user = res.data;
      dispatch({ type: 'SET_USER', payload: user });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: value
      }
    }));
  };

  return (
    <div>
      <h1 className="font-semibold text-xl">Privacy</h1>
      <h3 className="text-text-3 text-sm">Control who sees what about you.</h3>
      <div className="mt-8">
        <div className="pb-4 border-b border-border-2 mb-4 flex-between">
          <div className="text-sm text-white/70 cursor-pointer select-none">
            <div>Profile Visibility</div>
            <p className="text-[10px] sm:text-sm text-text-3">Who can view your full profile</p>
          </div>
          <div className="flex-center gap-2">
            {VISIBILITY_BTNS.map((btn) => (
              <div key={btn.id}>
                <input
                  type="radio"
                  name="visibility"
                  value={btn.id}
                  checked={state.settings.visibility === btn.id}
                  id={`visibility-${btn.id}`}
                  className="hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor={`visibility-${btn.id}`}
                  className={`btn-outlined w-full ${state.settings.visibility === btn.id && 'bg-accent/20 hover:bg-accent/20 text-accent-2'}`}
                >
                  {btn.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DynamicFrom
          schema={settingsSchema}
          defaultValues={state}
          submitHandler={handleSubmit}
          submitLabel="Submit"
          fieldClass="border-b border-border-2 pb-4"
        />
      </div>
    </div>
  );
};

export default PrivacySettings;
