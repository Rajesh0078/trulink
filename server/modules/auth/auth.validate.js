const { z } = require("zod");

const guestSchema = z.object({
  display_name: z.string().trim().min(2, "Display name is required!").max(100),
  gender: z.string().trim().min(2, "Gender is required!").max(100),
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

const registerSchema = z
  .object({
    username: z.string().trim().min(3, "Username is required"),
    display_name: z.string().trim().min(3, "Display name is required"),
    gender: z.string().trim().min(3, "Gender is required"),
    first_name: z.string().trim().optional(),
    last_name: z.string().trim().optional(),
    password: z
      .string()
      .trim()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),

    email: z.string().trim().email("Invalid email").optional(),

    phone: z.string().trim().optional(),
    interests: z.array(z.string()).optional(),
    avatar: z.string().trim().optional(),
    location: z
      .object({
        type: z.literal("Point"),
        coordinates: z.tuple([
          z.number().min(-180).max(180),
          z.number().min(-90).max(90),
        ]),
      })
      .optional(),
    settings: z
      .object({
        terms_of_use: z.boolean(),
        use_anonymous_data: z.boolean(),
        subscribe_updates: z.boolean(),
        show_location: z.boolean(),
        appear_in_search: z.boolean(),
        is_online: z.boolean(),
        notifications: z.boolean(),
      })
      .optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either phone or email is required",
    path: ["email"],
  });

const registerVerifySchema = z
  .object({
    otp: z
      .number({
        required_error: "OTP is required",
      })
      .int("OTP must be a number"),

    email: z.string().trim().email("Invalid email").optional(),

    phone: z.string().trim().optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["email"],
  });

module.exports = {
  guestSchema,
  loginSchema,
  registerSchema,
  registerVerifySchema,
};
