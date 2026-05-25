const { authenticate } = require("../../middlewares/auth.middleware");
const userController = require("./user.controller");

const userRouter = require("express").Router();

userRouter.use(authenticate);
userRouter.get("/", userController.getProfile);
userRouter.patch("/", userController.updateProfile);

module.exports = userRouter;
