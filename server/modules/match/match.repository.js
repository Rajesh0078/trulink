const Match = require("./match.model");

class MatchRepository {
  // ─── Create ──────────────────────────────────────────────────────────────────

  /**
   * Create a new like/match record (source → target).
   * Throws if the pair already exists (unique index guard).
   */
  async createMatch({ source_user, target_user, compatibility_score = null }) {
    const match = new Match({
      source_user,
      target_user,
      compatibility_score,
    });
    return match.save();
  }

  // ─── Read ─────────────────────────────────────────────────────────────────────

  /**
   * Find a match record between two users (direction-agnostic).
   */
  async findBetween(userA, userB) {
    return Match.findOne({
      is_deleted: false,
      $or: [
        { source_user: userA, target_user: userB },
        { source_user: userB, target_user: userA },
      ],
    });
  }

  /**
   * Find a match by its ID.
   */
  async findById(matchId) {
    return Match.findOne({ _id: matchId, is_deleted: false })
      .populate("source_user", "name avatar")
      .populate("target_user", "name avatar");
  }

  /**
   * Get all mutual (confirmed) matches for a user.
   */
  async getMutualMatches(userId) {
    return Match.getMutualMatches(userId);
  }

  /**
   * Get all pending likes that target a specific user (their incoming likes).
   */
  async getIncomingLikes(userId) {
    return Match.find({
      target_user: userId,
      status: "pending",
      is_deleted: false,
    }).populate("source_user", "name avatar");
  }

  /**
   * Get all likes a user has sent out (their outgoing likes).
   */
  async getOutgoingLikes(userId) {
    return Match.find({
      source_user: userId,
      status: "pending",
      is_deleted: false,
    }).populate("target_user", "name avatar");
  }

  /**
   * Get all matches for a user filtered by status.
   */
  async getMatchesByStatus(userId, status) {
    return Match.find({
      status,
      is_deleted: false,
      $or: [{ source_user: userId }, { target_user: userId }],
    })
      .populate("source_user", "name avatar")
      .populate("target_user", "name avatar")
      .sort({ updatedAt: -1 });
  }

  /**
   * Check whether two users are already mutually matched.
   */
  async areMatched(userA, userB) {
    return Match.areMatched(userA, userB);
  }

  /**
   * Paginated list of matches (for admin or explore views).
   */
  async listMatches({ page = 1, limit = 20, status, userId } = {}) {
    const query = { is_deleted: false };
    if (status) query.status = status;
    if (userId) {
      query.$or = [{ source_user: userId }, { target_user: userId }];
    }

    const [data, total] = await Promise.all([
      Match.find(query)
        .populate("source_user", "name avatar")
        .populate("target_user", "name avatar")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Match.countDocuments(query),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── Update ───────────────────────────────────────────────────────────────────

  /**
   * Mark the target user as having liked back → triggers mutual match
   * via the pre-save middleware on the model.
   */
  async acceptMatch(matchId) {
    const match = await Match.findOne({ _id: matchId, is_deleted: false });
    if (!match) throw new Error("Match not found");

    match.is_liked_by_target = true;
    // pre-save hook auto-promotes status → "matched" and sets matched_at
    return match.save();
  }

  /**
   * Reject an incoming like.
   */
  async rejectMatch(matchId) {
    return Match.findOneAndUpdate(
      { _id: matchId, is_deleted: false },
      { status: "rejected", ended_at: new Date() },
      { new: true },
    );
  }

  /**
   * Unmatch two users (either side can trigger).
   */
  async unmatch(matchId, endedByUserId) {
    const match = await Match.findOne({ _id: matchId, is_deleted: false });
    if (!match) throw new Error("Match not found");
    return match.unmatch(endedByUserId); // uses instance method
  }

  /**
   * Attach a conversation ID to an existing match.
   */
  async attachConversation(matchId, conversationId) {
    return Match.findByIdAndUpdate(
      matchId,
      { conversation: conversationId },
      { new: true },
    );
  }

  /**
   * Mark match notification as sent.
   */
  async markNotified(matchId) {
    return Match.findByIdAndUpdate(
      matchId,
      { is_notified: true },
      { new: true },
    );
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────

  /**
   * Soft-delete a match record.
   */
  async softDelete(matchId) {
    return Match.findByIdAndUpdate(
      matchId,
      { is_deleted: true },
      { new: true },
    );
  }

  /**
   * Hard-delete — use only for GDPR/account deletion flows.
   */
  async hardDelete(matchId) {
    return Match.findByIdAndDelete(matchId);
  }

  /**
   * Hard-delete all matches involving a user (account deletion).
   */
  async deleteAllForUser(userId) {
    return Match.deleteMany({
      $or: [{ source_user: userId }, { target_user: userId }],
    });
  }
}

module.exports = new MatchRepository();
