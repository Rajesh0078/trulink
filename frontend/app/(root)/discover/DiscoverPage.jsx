'use client';
import React, { useState } from 'react';
import { MdFilterAlt, MdOutlineRefresh } from 'react-icons/md';
import { Range } from 'react-range';

import RadarSection from '../_components/Discover/RadarSection';

import { genderTypes, interests, showTypes } from '@/lib/utils/constants';

const DiscoverPage = ({ users }) => {
  const [state, setState] = useState({
    show_type: 'radar',
    distance: 20,
    gender: 'male',
    minAge: 18,
    maxAge: 32,
    interests: [],
    status: false,
    verified_user: false
  });
  return (
    <>
      <div className="flex flex-col justify-between lg:flex-row h-[calc(100%-60px)] overflow-hidden">
        <div className="h-full w-full flex-center relative">
          <RadarSection users={users || []} />
          <div className="absolute top-4 px-4 flex-between w-full">
            <div className="flex-center gap-2">
              {showTypes.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setState((prev) => ({ ...prev, show_type: btn.key }))}
                  className={`btn-outlined gap-1 ${btn.key === state.show_type && 'border-accent-2 bg-accent text-text hover:bg-accent'}`}
                >
                  <btn.icon className="text-[17px]" />
                  {btn.name}
                </button>
              ))}
            </div>
            <div className="flex-center gap-2">
              <button className="flex-center gap-2 btn-outlined px-2 sm:px-4">
                <MdOutlineRefresh className="text-xl" />
                <span className="hidden sm:inline">Rescan</span>
              </button>
              <button className="flex-center gap-2 btn-outlined px-2 sm:px-4">
                <MdFilterAlt className="text-[19px]" />
                <span className="">Filters</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-surface/50 h-full min-w-90 w-90 border-l border-border-2 hidden lg:block">
          <div className="flex-between border-b p-4 border-border-2">
            <span className="text-[16px] font-bold text-text">Filters</span>
            <div className="text-sm">3 Applied</div>
          </div>
          <div className="p-4">
            <div>
              <span className="text-text-2 uppercase text-xs">I&apos;m looking for</span>
              <div className="flex mt-2 gap-2">
                {genderTypes.map((gender) => (
                  <button
                    key={gender.key}
                    onClick={() => setState((prev) => ({ ...prev, gender: gender.key }))}
                    className={`btn-outlined w-full ${state.gender === gender.key && 'bg-accent/20 hover:bg-accent/20 text-accent-2'}`}
                  >
                    {gender.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="py-6">
              <div className="flex-between text-text-2">
                <span className="text-text-2 uppercase text-xs">Age Range</span>
                <span className="text-sm">
                  {state.minAge} - {state.maxAge}
                </span>
              </div>
              <div className="w-full mt-4">
                <Range
                  step={1}
                  min={0}
                  max={120}
                  values={[state.minAge, state.maxAge]}
                  onChange={(val) => {
                    if (val[0] < 18 || val[1] > 99) {
                      return;
                    }
                    setState((prev) => ({ ...prev, minAge: val[0], maxAge: val[1] }));
                  }}
                  renderTrack={({ props, children }) => (
                    <div {...props} className="h-2 bg-surface-2 rounded">
                      {children}
                    </div>
                  )}
                  draggableTrack
                  renderThumb={({ props }) => (
                    <div
                      key={props.key}
                      {...Object.fromEntries(Object.entries(props).filter(([k]) => k !== 'key'))}
                      className="h-5 w-5 rounded-full bg-accent"
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <span className="text-text-2 uppercase text-xs">Interests</span>
              <div className="flex mt-2 gap-2 flex-wrap">
                {interests.map(({ key, name }) => {
                  const isActive = state.interests.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          interests: prev.interests.includes(key)
                            ? prev.interests.filter((i) => i !== key)
                            : [...prev.interests, key]
                        }))
                      }
                      className={`btn-outlined w-fit rounded-full ${isActive ? 'bg-accent/20 hover:bg-accent/20 text-accent-2' : ''}`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="py-6">
              <span className="text-text-2 uppercase text-xs">Status</span>
              <div className="w-full mt-1 flex-between">
                <label
                  htmlFor="status"
                  className="text-sm text-white/80 cursor-pointer select-none"
                >
                  Online only
                </label>
                <button
                  type="button"
                  id="status"
                  onClick={() => setState((prev) => ({ ...prev, status: !prev.status }))}
                  className={`relative  border border-border flex-center h-6 min-w-11 rounded-full transition-colors duration-400 ${state.status ? 'bg-accent' : 'bg-surface-2'}`}
                >
                  <span
                    className={`h-4 w-4 transform rounded-full transition-transform duration-300 bg-white/80 ${state.status ? 'translate-x-2.25' : '-translate-x-2.25'}`}
                  />
                </button>
              </div>
            </div>
            <div className="flex-center gap-2 w-fit">
              <input
                type="checkbox"
                id="verified_user"
                className="checkbox"
                value={state.verified_user}
                onChange={() =>
                  setState((prev) => ({ ...prev, verified_user: !prev.verified_user }))
                }
              />
              <label
                className="text-text-2 text-[13px] cursor-pointer flex items-center select-none"
                htmlFor="verified_user"
              >
                Verified users only
              </label>
            </div>
            <button className="btn-primary mt-6 w-full">Apply Filters</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
