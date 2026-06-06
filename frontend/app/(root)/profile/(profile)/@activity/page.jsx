import React from 'react';
import { MdHistory } from 'react-icons/md';

import { getUserActivitiesAction } from '@/lib/actions/activityActions';
import { ACTIVITY_CONFIG, formatTime } from '@/lib/utils/helpers';

const page = async () => {
  const allActivities = await getUserActivitiesAction({ limit: 4 });
  const data = allActivities?.data?.activities || [];
  return (
    <div className="card lg:flex-1/2 max-w-none! lg:min-w-120">
      <div className="flex-between">
        <div className="text-lg font-semibold">Recent Activity</div>
        <button className="btn-outlined flex-center gap-2 px-2">
          <MdHistory className="text-[18px]" />
          <span className="inline">View All</span>
        </button>
      </div>
      <div className="flex mt-6 gap-2 text-sm flex-col">
        {data.map((activity) => {
          const config = ACTIVITY_CONFIG[activity.action];
          const Icon = config?.icon || MdStars;
          return (
            <div key={activity._id} className="flex gap-3 hover:bg-surface-2 rounded-xl p-3">
              <div className={`min-w-10 h-10 rounded-lg flex-center ${config?.color}`}>
                <Icon className="text-lg" />
              </div>
              <div>
                <h3 className="text-text-2">{activity?.description}</h3>
                <p className="text-text-3">{formatTime(activity?.updatedAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
