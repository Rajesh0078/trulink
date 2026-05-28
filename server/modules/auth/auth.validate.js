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

const registerSchema = z
  .object({
    username: z.string().trim().min(3, "Username is required"),
    first_name: z.string().trim().min(3, "First name is required"),
    last_name: z.string().trim(),

    password: z
      .string()
      .trim()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),

    email: z.string().trim().email("Invalid email").optional(),

    phone: z.string().trim().optional(),
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
