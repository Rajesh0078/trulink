'use client';
import React, { useState } from 'react';
import { GoBell } from 'react-icons/go';
import { IoChatbubblesOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { MdLockOutline } from 'react-icons/md';
import { RiLinkM, RiShieldLine } from 'react-icons/ri';
import { TiUserOutline, TiWarningOutline } from 'react-icons/ti';

import AppearanceSettings from '@/components/common/settings/AppearanceSettings';
import ChatSettings from '@/components/common/settings/ChatSettings';
import ConnectedSettings from '@/components/common/settings/ConnectedSettings';
import DangerSettings from '@/components/common/settings/DangerSettings';
import NotificationSettings from '@/components/common/settings/NotificationSettings';
import PrivacySettings from '@/components/common/settings/PrivacySettings';
import ProfileSettings from '@/components/common/settings/ProfileSettings';
import SecuritySettings from '@/components/common/settings/SecuritySettings';
import { useStore } from '@/store/appProvider';

const SETTINGS_PREFS = [
  {
    key: 'account',
    name: 'Account',
    actions: [
      {
        name: 'Profile',
        key: 'profile',
        icon: TiUserOutline,
        size: 21
      },
      {
        name: 'Privacy',
        key: 'privacy',
        icon: RiShieldLine,
        size: 18
      },
      {
        name: 'Security',
        key: 'security',
        icon: MdLockOutline
      }
    ]
  },
  {
    key: 'preferences',
    name: 'Preferences',
    actions: [
      {
        name: 'Appearance',
        key: 'appearance',
        icon: IoColorPaletteOutline
      },
      {
        name: 'Notifications',
        key: 'notifications',
        icon: GoBell,
        size: 16
      },
      {
        name: 'Chat',
        key: 'chat',
        icon: IoChatbubblesOutline,
        size: 18
      }
    ]
  },
  {
    key: 'system',
    name: 'System',
    actions: [
      {
        name: 'Connected',
        key: 'connected',
        icon: RiLinkM
      },
      {
        name: 'Danger Zone',
        key: 'danger_zone',
        icon: TiWarningOutline
      }
    ]
  }
];

const Settings = () => {
  const [activeSetting, setActiveSetting] = useState('profile');
  const {
    state: { user }
  } = useStore();

  const handleActionClick = (actionKey) => {
    setActiveSetting(actionKey);
  };

  const settingsMap = {
    profile: ProfileSettings,
    privacy: PrivacySettings,
    security: SecuritySettings,
    appearance: AppearanceSettings,
    notifications: NotificationSettings,
    chat: ChatSettings,
    connected: ConnectedSettings,
    danger_zone: DangerSettings
  };

  const CurrentSetting = settingsMap[activeSetting];

  return (
    <>
      <div className="flex flex-col lg:flex-row mt-4 lg:mt-6 gap-4 w-full">
        {/* Mobile View */}
        <div className="h-7 border-b border-border lg:hidden flex gap-4 z-10 overflow-x-auto whitespace-nowrap scrollbar-none! scroll-smooth mb-1">
          {SETTINGS_PREFS.flatMap((s) => s.actions).map((action) => {
            const isActive = activeSetting === action.key;
            return (
              <button
                onClick={() => handleActionClick(action.key)}
                key={action.key}
                className="cursor-pointer text-sm"
              >
                <div
                  className={`h-full border-b ${isActive ? 'text-accent-2 border-accent-2' : 'border-transparent text-text-2'}`}
                >
                  {action.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Web View */}
        <div className="card hidden lg:inline min-w-60 px-4! py-5! h-fit">
          <ul className="flex flex-col">
            {SETTINGS_PREFS.map((setting) => (
              <li
                key={setting.key}
                className="mb-4 transition-all duration-200 border-b last:border-0 border-border-2"
              >
                <h2 className="text-xs font-medium ml-2 uppercase text-text-3 mb-2">
                  {setting.name}
                </h2>
                <ul className="flex flex-col gap-0.5 pb-3">
                  {setting.actions.map((action) => {
                    const Icon = action.icon;
                    const isDanger = action.key === 'danger_zone';
                    const isActive = action.key === activeSetting;
                    return (
                      <button onClick={() => handleActionClick(action.key)} key={action.key}>
                        <li
                          className={`flex items-center gap-2 text-sm p-2 rounded-lg text-text-2 cursor-pointer ${isDanger ? 'text-red-500!' : ''} ${isActive ? 'bg-[rgba(108,99,255,.15)] text-accent-2' : 'hover:bg-surface-2'}`}
                        >
                          <Icon size={action?.size || 20} className="w-5 h-5" />
                          {action.name}
                        </li>
                      </button>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="card w-full! max-w-none! mb-16 lg:min-w-160 xl:min-w-180">
          <CurrentSetting user={user} />
        </div>
      </div>
    </>
  );
};

export default Settings;
