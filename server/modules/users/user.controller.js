const asyncHandler = require("../../utils/asyncHanlder");
const { sendSuccess } = require("../../utils/response");
const userRepository = require("./user.repository");
const userService = require("./user.service");

class UserController {
  getProfile = asyncHandler(async (req, res) => {
    const user = await userService.getProfile(req.user.id);
    return sendSuccess(res, {
      data: user,
      message: "User profile retrieved successfully",
    });
  });

  updateProfile = asyncHandler(async (req, res) => {
    const user = await userService.updateProfile(req.user.id, req.body);
    return sendSuccess(res, {
      data: user,
      message: "User profile updated successfully",
    });
  });

  discoverProfiles = asyncHandler(async (req, res) => {
    const { distance } = req.body;
    const users = await userService.discoverProfiles(req.user.id, distance);
    return sendSuccess(res, {
      meta: {
        count: users.length,
      },
      data: users,
      message: "Users discovered successfully",
    });
  });
}

module.exports = new UserController();
