const matchRepository = require("./match.repository");

class MatchService {
  // ─── Like / Initiate ──────────────────────────────────────────────────────────

  /**
   * Source user likes target user.
   * - Prevents self-likes.
   * - Prevents duplicate likes.
   * - If the target already liked source first → auto-confirms mutual match.
   * Returns { match, isMutual }
   */
  async likeUser({ sourceUserId, targetUserId, compatibilityScore = null }) {
    if (sourceUserId.toString() === targetUserId.toString()) {
      throw new Error("You cannot like yourself.");
    }

    // Check if a record already exists in either direction
    const existing = await matchRepository.findBetween(
      sourceUserId,
      targetUserId,
    );

    if (existing) {
      // If target had already liked source first, accept it as a mutual match
      if (
        existing.source_user.toString() === targetUserId.toString() &&
        existing.status === "pending"
      ) {
        const match = await matchRepository.acceptMatch(existing._id);
        return { match, isMutual: true, isNew: false };
      }

      if (existing.status === "matched") {
        throw new Error("You are already matched with this user.");
      }

      if (existing.status === "rejected" || existing.status === "unmatched") {
        throw new Error("This match cannot be re-initiated.");
      }

      throw new Error("You have already liked this user.");
    }

    // Fresh like → create a pending record
    const match = await matchRepository.createMatch({
      source_user: sourceUserId,
      target_user: targetUserId,
      compatibility_score: compatibilityScore,
    });

    return { match, isMutual: false, isNew: true };
  }

  // ─── Accept / Reject ──────────────────────────────────────────────────────────

  /**
   * Target user accepts an incoming like → confirms mutual match.
   * Returns { match, isMutual: true }
   */
  async acceptLike({ matchId, targetUserId }) {
    const match = await matchRepository.findById(matchId);
    if (!match) throw new Error("Match not found.");

    if (match.target_user._id.toString() !== targetUserId.toString()) {
      throw new Error("Unauthorized: You are not the target of this match.");
    }

    if (match.status !== "pending") {
      throw new Error(`Cannot accept a match with status "${match.status}".`);
    }

    const updated = await matchRepository.acceptMatch(matchId);
    return { match: updated, isMutual: true };
  }

  /**
   * Target user rejects an incoming like.
   */
  async rejectLike({ matchId, targetUserId }) {
    const match = await matchRepository.findById(matchId);
    if (!match) throw new Error("Match not found.");

    if (match.target_user._id.toString() !== targetUserId.toString()) {
      throw new Error("Unauthorized: You are not the target of this match.");
    }

    if (match.status !== "pending") {
      throw new Error(`Cannot reject a match with status "${match.status}".`);
    }

    return matchRepository.rejectMatch(matchId);
  }

  // ─── Unmatch ──────────────────────────────────────────────────────────────────

  /**
   * Either party can unmatch. Validates ownership before proceeding.
   */
  async unmatch({ matchId, requestingUserId }) {
    const match = await matchRepository.findById(matchId);
    if (!match) throw new Error("Match not found.");

    const isParty =
      match.source_user._id.toString() === requestingUserId.toString() ||
      match.target_user._id.toString() === requestingUserId.toString();

    if (!isParty) {
      throw new Error("Unauthorized: You are not part of this match.");
    }

    if (match.status !== "matched") {
      throw new Error("Only confirmed matches can be unmatched.");
    }

    return matchRepository.unmatch(matchId, requestingUserId);
  }

  // ─── Fetch ────────────────────────────────────────────────────────────────────

  /**
   * Get all confirmed mutual matches for a user.
   */
  async getMyMatches(userId) {
    return matchRepository.getMutualMatches(userId);
  }

  /**
   * Get all pending incoming likes for a user.
   */
  async getIncomingLikes(userId) {
    return matchRepository.getIncomingLikes(userId);
  }

  /**
   * Get all pending outgoing likes for a user.
   */
  async getOutgoingLikes(userId) {
    return matchRepository.getOutgoingLikes(userId);
  }

  /**
   * Paginated match list — useful for admin dashboards.
   */
  async listMatches(filters) {
    return matchRepository.listMatches(filters);
  }

  /**
   * Get a single match by ID — validates user is a party to it.
   */
  async getMatchById({ matchId, requestingUserId }) {
    const match = await matchRepository.findById(matchId);
    if (!match) throw new Error("Match not found.");

    const isParty =
      match.source_user._id.toString() === requestingUserId.toString() ||
      match.target_user._id.toString() === requestingUserId.toString();

    if (!isParty) {
      throw new Error("Unauthorized: You are not part of this match.");
    }

    return match;
  }

  // ─── Conversation Linking ─────────────────────────────────────────────────────

  /**
   * Attach a conversation to a confirmed match (called after chat is created).
   */
  async linkConversation({ matchId, conversationId }) {
    const match = await matchRepository.findById(matchId);
    if (!match) throw new Error("Match not found.");
    if (match.status !== "matched") {
      throw new Error("Conversations can only be linked to confirmed matches.");
    }
    return matchRepository.attachConversation(matchId, conversationId);
  }

  // ─── Notification Helpers ─────────────────────────────────────────────────────

  /**
   * Mark a match as notified (call after push notification is sent).
   */
  async markNotified(matchId) {
    return matchRepository.markNotified(matchId);
  }

  // ─── Account Deletion ─────────────────────────────────────────────────────────

  /**
   * Wipe all match records for a user — called during account deletion.
   */
  async purgeUserMatches(userId) {
    return matchRepository.deleteAllForUser(userId);
  }
}

module.exports = new MatchService();
