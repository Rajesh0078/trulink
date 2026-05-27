const asyncHandler = require("../../utils/asyncHanlder");
const { sendCreated, sendSuccess } = require("../../utils/response");
const authService = require("./auth.service");

class AuthController {
  guest = asyncHandler(async (req, res) => {
    const body = {
      ...req.body,
      username: `guest_${Math.random().toString(36).substring(2, 10)}`,
    };
    const result = await authService.guest(body);
    return sendCreated(res, result, "Account created successfully");
  });

  register = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "User registered successfully" });
  });

  signIn = asyncHandler(async (req, res) => {
    const data = await authService.login(req, res);
    return sendSuccess(res, {
      data,
      message: "Login successful",
    });
  });

  signOut = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User signed out successfully" });
  });
}

module.exports = new AuthController();
