import React from 'react';
import { BsFillInboxFill } from 'react-icons/bs';
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
        {data.length === 0 ? (
          <div className="flex-center flex-col h-60 text-center px-6">
            <div className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <BsFillInboxFill className="text-2xl text-text-3" />
            </div>

            <h3 className="text-lg font-semibold text-text-1">No Activity Yet</h3>

            <p className="text-sm text-text-3 mt-2 max-w-sm">
              Your recent actions, notifications, and account updates will appear here once activity
              starts happening.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((activity) => {
              const config = ACTIVITY_CONFIG[activity.action];
              const Icon = config?.icon || MdStars;

              return (
                <div
                  key={activity._id}
                  className="group flex gap-4 rounded-2xl border border-transparent transition-all duration-200"
                >
                  <div className={`min-w-12 w-12 h-12 rounded-xl flex-center  ${config?.color}`}>
                    <Icon className="text-xl" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1 ">
                      <div>
                        <h3 className="font-medium text-text-2">{activity.description}</h3>

                        {config?.title && (
                          <p className="text-xs text-primary mt-1 font-medium">{config.title}</p>
                        )}
                      </div>

                      <span className="text-xs text-text-3 whitespace-nowrap">
                        {formatTime(activity.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
