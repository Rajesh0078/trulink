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

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),

  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain uppercase, lowercase, number and special character",
    ),
});

module.exports = {
  guestSchema,
  loginSchema,
};
