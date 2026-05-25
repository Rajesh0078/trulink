const { z } = require("zod");

const guestSchema = z.object({
  first_name: z.string().trim().min(2, "First name is required!").max(100),
  last_name: z.string().trim().optional(),
  location: z
    .object({
      type: z.literal("Point"),

      coordinates: z.tuple([z.number(), z.number()]),
    })
    .optional(),
});

module.exports = {
  guestSchema,
};
