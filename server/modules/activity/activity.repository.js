const Activity = require("./activity.model");

class ActivityRepository {
  async create(payload) {
    return Activity.create(payload);
  }

  async findByUserId(userId, options = {}) {
    const { page = 1, limit = 10 } = options;

    return Activity.find({
      user_id: userId,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  async countByUserId(userId) {
    return Activity.countDocuments({
      user_id: userId,
    });
  }

  async deleteByUserId(userId) {
    return Activity.deleteMany({
      user_id: userId,
    });
  }
}

module.exports = new ActivityRepository();
