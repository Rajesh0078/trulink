import React from 'react'

const Loading = () => {
  return (
    <section className='page'>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold'>Settings</h1>
        <h3 className='text-md text-text-2 mt-0'>Customize your TruLink experience</h3>
      </div>
      <div className='flex flex-col lg:flex-row mt-4 lg:mt-6 gap-4 w-full animate-pulse'>
        {/* Mobile Tabs */}
        <div className='h-7 border-b border-border lg:hidden flex gap-4 overflow-x-auto whitespace-nowrap mb-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='h-5 w-20 rounded bg-surface-2'
            />
          ))}
        </div>

        {/* Sidebar */}
        <div className='card hidden lg:inline max-w-60! p-4! h-fit'>
          <div className='flex flex-col gap-5'>
            {Array.from({ length: 3 }).map((_, groupIndex) => (
              <div key={groupIndex}>
                <div className='h-3 w-20 rounded bg-surface-2 ml-4 mb-3' />

                <div className='flex flex-col gap-1'>
                  {Array.from({ length: 3 }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className='flex items-center gap-2 p-2 rounded-lg'
                    >
                      <div className='w-5 h-5 rounded bg-surface-2' />

                      <div className='h-4 w-24 rounded bg-surface-2' />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='card w-full! max-w-none! p-6'>
          {/* Title */}
          <div className='mb-8'>
            <div className='h-7 w-48 rounded bg-surface-2 mb-3' />

            <div className='h-4 w-72 rounded bg-surface-2' />
          </div>

          {/* Profile Upload */}
          <div className='rounded-2xl border border-border p-5 mb-6 flex items-center gap-4'>
            <div className='size-20 rounded-full bg-surface-2' />

            <div className='flex flex-col gap-3'>
              <div className='h-4 w-52 rounded bg-surface-2' />

              <div className='flex gap-3'>
                <div className='h-10 w-28 rounded-lg bg-surface-2' />

                <div className='h-10 w-28 rounded-lg bg-surface-2' />
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className='grid grid-cols-12 gap-5 mb-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className='col-span-12 lg:col-span-4'
              >
                <div className='h-4 w-24 rounded bg-surface-2 mb-2' />

                <div className='h-12 rounded-xl bg-surface-2' />
              </div>
            ))}
          </div>

          {/* Textarea */}
          <div className='mb-6'>
            <div className='h-4 w-16 rounded bg-surface-2 mb-2' />

            <div className='h-15.5 rounded-2xl bg-surface-2' />
          </div>

          {/* Button */}
          <div className='h-12 rounded-xl bg-surface-2' />
        </div>
      </div>
    </section>
  )
}

export default Loading