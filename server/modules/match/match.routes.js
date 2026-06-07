const express = require("express");
const matchRouter = express.Router();
const matchController = require("./match.controller");
const { authenticate } = require("../../middlewares/auth.middleware");

// ─── All match routes require authentication ──────────────────────────────────
matchRouter.use(authenticate);

// ─── Like ─────────────────────────────────────────────────────────────────────

/**
 * @route   POST /api/matches/like
 * @desc    Like a user (creates a pending match or confirms mutual match)
 * @access  Private
 * @body    { target_user_id: ObjectId, compatibility_score?: Number }
 */
matchRouter.post("/like", matchController.likeUser.bind(matchController));

// ─── Incoming / Outgoing Likes ────────────────────────────────────────────────

/**
 * @route   GET /api/matches/likes/incoming
 * @desc    Get all pending likes targeting the logged-in user
 * @access  Private
 */
matchRouter.get(
  "/likes/incoming",
  matchController.getIncomingLikes.bind(matchController),
);

/**
 * @route   GET /api/matches/likes/outgoing
 * @desc    Get all pending likes sent by the logged-in user
 * @access  Private
 */
matchRouter.get(
  "/likes/outgoing",
  matchController.getOutgoingLikes.bind(matchController),
);

// ─── My Matches ───────────────────────────────────────────────────────────────

/**
 * @route   GET /api/matches
 * @desc    Get all confirmed mutual matches for the logged-in user
 * @access  Private
 */
matchRouter.get("/", matchController.getMyMatches.bind(matchController));

// ─── Admin ────────────────────────────────────────────────────────────────────

/**
 * @route   GET /api/matches/admin/list
 * @desc    Paginated match list for admin
 * @access  Admin
 * @query   page, limit, status, userId
 */
// matchRouter.get(
//   "/admin/list",
//   authorizeAdmin,
//   matchController.adminListMatches.bind(matchController),
// );

// ─── Single Match Operations (must come after static paths) ───────────────────

/**
 * @route   GET /api/matches/:matchId
 * @desc    Get a single match by ID (parties only)
 * @access  Private
 */
matchRouter.get(
  "/:matchId",
  matchController.getMatchById.bind(matchController),
);

/**
 * @route   PATCH /api/matches/:matchId/accept
 * @desc    Accept an incoming like (target user only)
 * @access  Private
 */
matchRouter.patch(
  "/:matchId/accept",
  matchController.acceptLike.bind(matchController),
);

/**
 * @route   PATCH /api/matches/:matchId/reject
 * @desc    Reject an incoming like (target user only)
 * @access  Private
 */
matchRouter.patch(
  "/:matchId/reject",
  matchController.rejectLike.bind(matchController),
);

/**
 * @route   PATCH /api/matches/:matchId/unmatch
 * @desc    Unmatch a confirmed match (either party)
 * @access  Private
 */
matchRouter.patch(
  "/:matchId/unmatch",
  matchController.unmatch.bind(matchController),
);

/**
 * @route   PATCH /api/matches/:matchId/conversation
 * @desc    Link a conversation ID to a match (internal/service use)
 * @access  Private
 * @body    { conversation_id: ObjectId }
 */
matchRouter.patch(
  "/:matchId/conversation",
  matchController.linkConversation.bind(matchController),
);

module.exports = matchRouter;
