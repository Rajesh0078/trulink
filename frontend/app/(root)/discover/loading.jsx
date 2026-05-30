import React from 'react';

const DiscoverLoading = () => {
  return (
    <section className="w-full animate-pulse">
      {/* Header */}
      <div className="flex-between h-15 border-b border-border-2 px-8 bg-surface/50">
        <div className="h-8 w-72 rounded-md bg-surface-2" />

        <div className="flex gap-2">
          <div className="h-9 w-52 rounded-md bg-surface-2" />
          <div className="h-9 w-28 rounded-md bg-surface-2" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)] overflow-hidden">
        {/* Radar Section */}
        <div className="relative flex-1 bg-surface/20">
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
            <div className="flex gap-2">
              <div className="h-10 w-24 rounded-lg bg-surface-2" />
              <div className="h-10 w-24 rounded-lg bg-surface-2" />
              <div className="h-10 w-24 rounded-lg bg-surface-2" />
            </div>

            <div className="h-10 w-28 rounded-lg bg-surface-2" />
          </div>

          {/* Radar */}
          <div className="h-full flex items-center justify-center">
            <div className="relative">
              <div className="h-150 w-150 rounded-full border border-surface-2" />
              <div className="absolute inset-12 rounded-full border border-surface-2" />
              <div className="absolute inset-24 rounded-full border border-surface-2" />
              <div className="absolute inset-36 rounded-full border border-surface-2" />

              {/* Center User */}
              <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-2" />

              {/* Anonymous Users */}
              <div className="absolute top-14 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-surface-2" />
              <div className="absolute top-24 right-24 h-14 w-14 rounded-full bg-surface-2" />
              <div className="absolute right-12 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-surface-2" />
              <div className="absolute bottom-20 right-32 h-14 w-14 rounded-full bg-surface-2" />
              <div className="absolute bottom-8 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-surface-2" />
              <div className="absolute bottom-28 left-24 h-14 w-14 rounded-full bg-surface-2" />
              <div className="absolute top-1/2 left-8 h-14 w-14 -translate-y-1/2 rounded-full bg-surface-2" />
            </div>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="bg-surface/50 min-w-90 w-90 border-l border-border-2">
          <div className="flex-between border-b p-4 border-border-2">
            <div className="h-6 w-20 rounded bg-surface-2" />
            <div className="h-5 w-16 rounded bg-surface-2" />
          </div>

          <div className="p-4 space-y-8">
            {/* Gender */}
            <div>
              <div className="h-3 w-24 rounded bg-surface-2 mb-3" />
              <div className="flex gap-2">
                <div className="h-10 flex-1 rounded-lg bg-surface-2" />
                <div className="h-10 flex-1 rounded-lg bg-surface-2" />
                <div className="h-10 flex-1 rounded-lg bg-surface-2" />
              </div>
            </div>

            {/* Age */}
            <div>
              <div className="flex justify-between mb-4">
                <div className="h-3 w-24 rounded bg-surface-2" />
                <div className="h-4 w-14 rounded bg-surface-2" />
              </div>
              <div className="h-2 w-full rounded-full bg-surface-2" />
            </div>

            {/* Interests */}
            <div>
              <div className="h-3 w-20 rounded bg-surface-2 mb-4" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-10 w-24 rounded-full bg-surface-2" />
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <div className="h-3 w-16 rounded bg-surface-2 mb-3" />
              <div className="flex justify-between">
                <div className="h-5 w-24 rounded bg-surface-2" />
                <div className="h-6 w-12 rounded-full bg-surface-2" />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded bg-surface-2" />
              <div className="h-4 w-36 rounded bg-surface-2" />
            </div>

            {/* Button */}
            <div className="h-11 w-full rounded-lg bg-surface-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverLoading;
