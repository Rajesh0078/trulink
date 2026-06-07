const { Schema, model } = require("mongoose");

const MatchSchema = new Schema(
  {
    // The user who initiated the match/like
    source_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // The user being matched with
    target_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Current state of the match
    status: {
      type: String,
      enum: ["pending", "matched", "rejected", "unmatched", "blocked"],
      default: "pending",
      index: true,
    },

    // Whether source_user has liked target_user
    is_liked_by_source: {
      type: Boolean,
      default: true,
    },

    // Whether target_user has liked back (mutual = matched)
    is_liked_by_target: {
      type: Boolean,
      default: false,
    },

    // Timestamp when mutual match was established
    matched_at: {
      type: Date,
      default: null,
    },

    // Timestamp when the match was unmatched or rejected
    ended_at: {
      type: Date,
      default: null,
    },

    // Whether either user has been notified of the match
    is_notified: {
      type: Boolean,
      default: false,
    },

    // Reference to the conversation thread (if any) linked to this match
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },

    // Who unmatched/ended the match (for audit purposes)
    ended_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Optional: score or compatibility metric
    compatibility_score: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    // Soft delete flag
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  },
);

// ─── Compound Indexes ────────────────────────────────────────────────────────

// Prevent duplicate match pairs (source → target should be unique)
MatchSchema.index({ source_user: 1, target_user: 1 }, { unique: true });

// Fast lookup of all matches for a given user
MatchSchema.index({ source_user: 1, status: 1 });
MatchSchema.index({ target_user: 1, status: 1 });

// ─── Virtuals ────────────────────────────────────────────────────────────────

// True only when both users have liked each other
MatchSchema.virtual("is_mutual").get(function () {
  return this.is_liked_by_source && this.is_liked_by_target;
});

// ─── Pre-save Middleware ──────────────────────────────────────────────────────
MatchSchema.pre("save", async function () {
  // Auto-set status to "matched" when mutual interest is detected
  if (this.is_liked_by_source && this.is_liked_by_target) {
    if (this.status === "pending") {
      this.status = "matched";
      this.matched_at = this.matched_at || new Date();
    }
  }
});

// ─── Static Methods ───────────────────────────────────────────────────────────

// Find all mutual matches for a user
MatchSchema.statics.getMutualMatches = function (userId) {
  return this.find({
    status: "matched",
    is_deleted: false,
    $or: [{ source_user: userId }, { target_user: userId }],
  })
    .populate("source_user", "name avatar")
    .populate("target_user", "name avatar");
};

// Check if two users are already matched
MatchSchema.statics.areMatched = async function (userA, userB) {
  const match = await this.findOne({
    status: "matched",
    is_deleted: false,
    $or: [
      { source_user: userA, target_user: userB },
      { source_user: userB, target_user: userA },
    ],
  });
  return !!match;
};

// ─── Instance Methods ─────────────────────────────────────────────────────────

// Unmatch: soft-end the match
MatchSchema.methods.unmatch = function (endedByUserId) {
  this.status = "unmatched";
  this.ended_at = new Date();
  this.ended_by = endedByUserId;
  return this.save();
};

module.exports = model("Match", MatchSchema, "matches");
