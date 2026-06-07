"use strict";

const matchService = require("./match.service");
const {
  sendSuccess,
  sendError,
  sendCreated,
  sendNoContent,
} = require("../../utils/response"); // ← adjust path to your response helper

// ─── Status code resolver ─────────────────────────────────────────────────────

const resolveErrorStatus = (message) => {
  if (message.startsWith("Unauthorized")) return 403;
  if (message.includes("not found")) return 404;
  if (
    message.includes("required") ||
    message.includes("cannot") ||
    message.includes("already") ||
    message.includes("Cannot")
  )
    return 422;
  return 400;
};

// ─── Controller ───────────────────────────────────────────────────────────────

class MatchController {
  /**
   * POST /api/matches/like
   * Authenticated user likes another user.
   * Body: { target_user_id, compatibility_score? }
   */
  async likeUser(req, res) {
    try {
      const { target_user_id, compatibility_score } = req.body;

      if (!target_user_id) {
        return sendError(res, {
          statusCode: 422,
          message: "target_user_id is required.",
        });
      }

      const result = await matchService.likeUser({
        sourceUserId: req.user.id,
        targetUserId: target_user_id,
        compatibilityScore: compatibility_score,
      });

      const message = result.isMutual
        ? "It's a match! 🎉"
        : "Like sent successfully.";

      return sendCreated(res, result, message);
    } catch (error) {
      return sendError(res, {
        statusCode: resolveErrorStatus(error.message),
        message: error.message,
      });
    }
  }

  /**
   * PATCH /api/matches/:matchId/accept
   * Target user accepts an incoming like → confirms mutual match.
   */
  async acceptLike(req, res) {
    try {
      const result = await matchService.acceptLike({
        matchId: req.params.matchId,
        targetUserId: req.user._id,
      });

      return sendSuccess(res, {
        message: "Match accepted! 🎉",
        data: result,
      });
    } catch (error) {
      return sendError(res, {
        statusCode: resolveErrorStatus(error.message),
        message: error.message,
      });
    }
  }

  /**
   * PATCH /api/matches/:matchId/reject
   * Target user rejects an incoming like.
   */
  async rejectLike(req, res) {
    try {
      const match = await matchService.rejectLike({
        matchId: req.params.matchId,
        targetUserId: req.user._id,
      });

      return sendSuccess(res, {
        message: "Like rejected.",
        data: match,
      });
    } catch (error) {
      return sendError(res, {
        statusCode: resolveErrorStatus(error.message),
        message: error.message,
      });
    }
  }

  /**
   * PATCH /api/matches/:matchId/unmatch
   * Either party unmatches a confirmed match.
   */
  async unmatch(req, res) {
    try {
      const match = await matchService.unmatch({
        matchId: req.params.matchId,
        requestingUserId: req.user._id,
      });

      return sendSuccess(res, {
        message: "Unmatched successfully.",
        data: match,
      });
    } catch (error) {
      return sendError(res, {
        statusCode: resolveErrorStatus(error.message),
        message: error.message,
      });
    }
  }

  /**
   * GET /api/matches
   * All confirmed mutual matches for the logged-in user.
   */
  async getMyMatches(req, res) {
    try {
      const matches = await matchService.getMyMatches(req.user._id);

      return sendSuccess(res, {
        message: "Matches fetched successfully.",
        data: matches,
        meta: { count: matches.length },
      });
    } catch (error) {
      return sendError(res, { statusCode: 500, message: error.message });
    }
  }

  /**
   * GET /api/matches/likes/incoming
   * All pending likes targeting the logged-in user.
   */
  async getIncomingLikes(req, res) {
    try {
      const likes = await matchService.getIncomingLikes(req.user._id);

      return sendSuccess(res, {
        message: "Incoming likes fetched successfully.",
        data: likes,
        meta: { count: likes.length },
      });
    } catch (error) {
      return sendError(res, { statusCode: 500, message: error.message });
    }
  }

  /**
   * GET /api/matches/likes/outgoing
   * All pending likes sent by the logged-in user.
   */
  async getOutgoingLikes(req, res) {
    try {
      const likes = await matchService.getOutgoingLikes(req.user._id);

      return sendSuccess(res, {
        message: "Outgoing likes fetched successfully.",
        data: likes,
        meta: { count: likes.length },
      });
    } catch (error) {
      return sendError(res, { statusCode: 500, message: error.message });
    }
  }

  /**
   * GET /api/matches/:matchId
   * Single match detail — accessible only by parties involved.
   */
  async getMatchById(req, res) {
    try {
      const match = await matchService.getMatchById({
        matchId: req.params.matchId,
        requestingUserId: req.user._id,
      });

      return sendSuccess(res, {
        message: "Match fetched successfully.",
        data: match,
      });
    } catch (error) {
      return sendError(res, {
        statusCode: resolveErrorStatus(error.message),
        message: error.message,
      });
    }
  }

  /**
   * GET /api/matches/admin/list
   * Paginated match list for admin dashboard.
   * Query: ?page=1&limit=20&status=matched&userId=...
   */
  async adminListMatches(req, res) {
    try {
      const { page, limit, status, userId } = req.query;

      const result = await matchService.listMatches({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        userId,
      });

      return sendSuccess(res, {
        message: "Matches listed successfully.",
        data: result.data,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        },
      });
    } catch (error) {
      return sendError(res, { statusCode: 500, message: error.message });
    }
  }

  /**
   * PATCH /api/matches/:matchId/conversation
   * Link a conversation ID to a confirmed match.
   * Body: { conversation_id }
   */
  async linkConversation(req, res) {
    try {
      const { conversation_id } = req.body;

      if (!conversation_id) {
        return sendError(res, {
          statusCode: 422,
          message: "conversation_id is required.",
        });
      }

      const match = await matchService.linkConversation({
        matchId: req.params.matchId,
        conversationId: conversation_id,
      });

      return sendSuccess(res, {
        message: "Conversation linked successfully.",
        data: match,
      });
    } catch (error) {
      return sendError(res, {
        statusCode: resolveErrorStatus(error.message),
        message: error.message,
      });
    }
  }
}

module.exports = new MatchController();
