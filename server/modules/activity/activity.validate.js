const { z } = require("zod");
const { ACTIVITY_ACTIONS } = require("../../utils/constants");

const activitySchema = z.object({
  action: z.enum(Object.values(ACTIVITY_ACTIONS)),
  description: z.string().trim().min(1),
  metadata: z.record(z.string(), z.any()).optional(),
});

module.exports = { activitySchema };
