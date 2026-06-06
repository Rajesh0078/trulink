const { authenticate } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const activityController = require("./activity.controller");
const { activitySchema } = require("./activity.validate");

const activityRouter = require("express").Router();

activityRouter.use(authenticate);

activityRouter.post(
  "/",
  validate(activitySchema),
  activityController.createActivity,
);

activityRouter.get("/", activityController.getUserActivities);

module.exports = activityRouter;
