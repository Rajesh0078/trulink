const authRouter = require("express").Router();
const validate = require("../../middlewares/validate.middleware");
const authController = require("./auth.controller");
const {
  guestSchema,
  loginSchema,
  registerSchema,
  registerVerifySchema,
} = require("./auth.validate");

authRouter.post("/guest", validate(guestSchema), authController.guest);
authRouter.post(
  "/register/request",
  validate(registerSchema),
  authController.register,
);
authRouter.post(
  "/register/verify",
  validate(registerVerifySchema),
  authController.registerVerify,
);
authRouter.post("/login", validate(loginSchema), authController.signIn);
authRouter.post("/sign-out", authController.signOut);

module.exports = authRouter;
