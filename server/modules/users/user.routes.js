const { authenticate } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { loginSchema } = require("../auth/auth.validate");
const userController = require("./user.controller");

const userRouter = require("express").Router();

userRouter.use(authenticate);
userRouter.get("/", userController.getProfile);
userRouter.patch("/", userController.updateProfile);
userRouter.post("/discover", userController.discoverProfiles);
userRouter.post(
  "/upgrade-guest/request",
  validate(loginSchema),
  userController.upgradeUserRequest,
);
userRouter.post("/upgrade-guest/verify", userController.upgradeUserVerify);

module.exports = userRouter;
