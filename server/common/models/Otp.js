const { Schema, model } = require("mongoose");

const OtpSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    otp: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: [
        "register",
        "forgot_password",
        "upgrade_guest",
        "phone_verification",
        "email_verification",
      ],
      required: true,
    },

    type: {
      type: String,
      enum: ["email", "phone"],
      required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    phone: {
      type: String,
      default: null,
    },

    payload: {
      type: Schema.Types.Mixed,
      default: null,
    },

    expires_at: {
      type: Date,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

OtpSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = model("Otp", OtpSchema, "otps");
