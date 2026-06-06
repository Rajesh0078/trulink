export default function Loading() {
  return (
    <div className="h-dvh flex">
      <div className="h-full w-0 sm:min-w-14 z-10 animate-pulse border-r border-border-2 "></div>
      <div className="h-full w-full sm:w-[calc(100%-56px)] animate-pulse overflow-hidden">
        {/* Cover */}
        <div className="relative w-full h-24 sm:h-40 border-b border-border bg-surface">
          {/* Button */}
          <div className="absolute right-4 top-4 h-9 w-36 rounded-md bg-surface-2 border border-border-2" />
        </div>
        {/* Profile Section */}
        <div className="px-5 sm:px-8 relative">
          {/* Avatar */}
          <div className="h-15 w-15 sm:h-26 sm:w-26 rounded-full custom-gradient -mt-8 sm:-mt-15 border-4 border-bg shrink-0" />

          {/* Content */}
          <div className="mt-4 space-y-3">
            {/* Name */}
            <div className="h-8 w-48 rounded-md bg-surface-2" />

            {/* Username + joined */}
            <div className="h-5 w-72 rounded-md bg-surface-2" />

            {/* Bio */}
            <div className="space-y-2 pt-2">
              <div className="h-4 w-80 rounded-md bg-surface-2" />
              <div className="h-4 w-56 rounded-md bg-surface-2" />
            </div>
          </div>
        </div>
        {/* Large Content Placeholder */}
        <div className="px-5 sm:px-8 mt-10">
          <div className="rounded-3xl border border-border bg-surface/50 h-80" />
        </div>
      </div>
    </div>
  );
}
