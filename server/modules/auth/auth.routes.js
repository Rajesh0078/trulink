const authRouter = require("express").Router();
const validate = require("../../middlewares/validate.middleware");
const authController = require("./auth.controller");
const { guestSchema, loginSchema } = require("./auth.validate");

authRouter.post("/guest", validate(guestSchema), authController.guest);
authRouter.post("/sign-up", authController.register);
authRouter.post("/login", validate(loginSchema), authController.signIn);
authRouter.post("/sign-out", authController.signOut);

module.exports = authRouter;
