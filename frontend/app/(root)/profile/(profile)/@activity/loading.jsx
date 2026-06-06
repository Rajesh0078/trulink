import React from 'react';

const loading = () => {
  return (
    <div className="card flex-1/2 max-w-none! min-w-163.25">
      {/* Header */}
      <div className="flex-between">
        <div className="h-6 w-36 rounded-md bg-surface-2 animate-pulse" />

        <div className="h-9 w-24 rounded-lg bg-surface-2 animate-pulse" />
      </div>

      {/* Activities */}
      <div className="flex mt-6 gap-2 flex-col">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-3 rounded-xl p-3">
            {/* Icon */}
            <div className="min-w-10 h-10 rounded-lg bg-surface-2 animate-pulse" />

            {/* Content */}
            <div className="flex-1">
              <div className="h-4 w-3/4 rounded bg-surface-2 animate-pulse" />

              <div className="h-3 w-20 mt-2 rounded bg-surface-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
