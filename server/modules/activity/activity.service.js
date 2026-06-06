const activityRepository = require("./activity.repository");

class ActivityService {
  async createActivity({ userId, action, description, metadata = {} }) {
    return activityRepository.create({
      user_id: userId,
      action,
      description,
      metadata,
    });
  }

  async getUserActivities({ userId, page = 1, limit = 10 }) {
    const [activities, total] = await Promise.all([
      activityRepository.findByUserId(userId, {
        page,
        limit,
      }),
      activityRepository.countByUserId(userId),
    ]);

    return {
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = new ActivityService();
