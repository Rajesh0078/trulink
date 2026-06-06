const { sendCreated, sendSuccess } = require("../../utils/response");
const activityService = require("./activity.service");

class ActivityController {
  async createActivity(req, res) {
    const payload = {
      ...req.body,
      userId: req.user.id,
    };
    const result = await activityService.createActivity(payload);
    return sendCreated(res, result, "Activity created successfully");
  }

  async getUserActivities(req, res) {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const data = await activityService.getUserActivities({
      userId: req.user.id,
      page,
      limit,
    });
    return sendSuccess(res, {
      data,
      message: "Activities retrieved successfully",
    });
  }
}

module.exports = new ActivityController();
