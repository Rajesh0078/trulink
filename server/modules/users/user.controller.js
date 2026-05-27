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

  upgradeGuest = asyncHandler(async (req, res) => {
    const user = await userService.upgradeGuest(req, res);
    return sendSuccess(res, {
      data: user,
      message: "User profile retrieved successfully",
    });
  });

  upgradeUserRequest = asyncHandler(async (req, res) => {
    await userService.upgradeUserRequest(req, res);
    return sendSuccess(res, {
      message: "Otp sent successfully!",
    });
  });

  upgradeUserVerify = asyncHandler(async (req, res) => {
    const user = await userService.upgradeGuestVerify(req, res);
    return sendSuccess(res, {
      data: user,
      message: "User upgraded succesdfully!",
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
