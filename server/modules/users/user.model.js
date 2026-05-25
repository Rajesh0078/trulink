const { Schema, model } = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const bcrypt = require("bcryptjs");

const addressSchema = new Schema(
  {
    area: {
      type: String,
      trim: true,
      default: null,
    },

    city: {
      type: String,
      trim: true,
      default: null,
    },

    state: {
      type: String,
      trim: true,
      default: null,
    },

    country: {
      type: String,
      trim: true,
      default: null,
    },

    postal_code: {
      type: String,
      trim: true,
      default: null,
    },

    formatted_address: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { _id: false },
);

const locationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return (
            v.length === 2 &&
            v[0] >= -180 &&
            v[0] <= 180 &&
            v[1] >= -90 &&
            v[1] <= 90
          );
        },
        message: "Coordinates must be [longitude, latitude]",
      },
    },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      default: null,
      minlength: [3, "First name must be at least 2 characters"],
      required: [true, "First name is required"],
    },

    last_name: {
      type: String,
      trim: true,
      default: null,
    },

    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      required: [true, "Username is required"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: function () {
        return this.account_type === "permanent";
      },
    },

    password: {
      type: String,
      default: null,
      select: false,
    },

    avatar: {
      type: String,
      default: null,
    },

    interests: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      enum: ["anonymous", "user", "admin", "super_admin"],
      default: "anonymous",
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_online: {
      type: Boolean,
      default: false,
    },

    last_seen_at: {
      type: Date,
      default: null,
    },

    deleted_at: {
      type: Date,
      default: null,
      index: true,
    },

    account_type: {
      type: String,
      enum: ["guest", "permanent"],
      default: "permanent",
    },

    bio: {
      type: String,
      trim: true,
      default: null,
    },

    location: {
      type: locationSchema,
      default: null,
    },

    address: {
      type: addressSchema,
      default: null,
    },

    settings: {
      notifications: { type: Boolean, default: true },
      allow_messages: {
        type: String,
        enum: ["everyone", "friends", "none"],
        default: "everyone",
      },
      show_online: { type: Boolean, default: true },
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },

    guest_expires_at: {
      type: Date,
      default: function () {
        if (this.account_type === "guest") {
          return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
        }

        return null;
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      },
    },

    toObject: {
      virtuals: true,
    },
  },
);

UserSchema.index({ location: "2dsphere" });
UserSchema.index({ email: 1, is_active: 1 });
UserSchema.index({ username: 1, role: 1 });
UserSchema.index({ createdAt: -1 });

UserSchema.index(
  { email: 1 },
  {
    unique: true,
    sparse: true,
  },
);

UserSchema.virtual("full_name").get(function () {
  return `${this.first_name || ""} ${this.last_name || ""}`.trim();
});

UserSchema.pre("save", async function () {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(12);

    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.is_online) {
    this.last_seen_at = new Date();
  }
});

UserSchema.plugin(mongooseLeanVirtuals);

module.exports = model("User", UserSchema, "users");
