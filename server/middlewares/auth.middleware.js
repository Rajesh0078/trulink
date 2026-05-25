const asyncHandler = require("../utils/asyncHanlder");
const { verifyAccessToken } = require("../utils/jwt");

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const err = new Error("No token provided");
    err.statusCode = 401;
    err.name = "AuthenticationError";
    return next(err);
  }
  const decoded = verifyAccessToken(token);
  req.user = decoded;
  req.token = token;
  next();
});

module.exports = { authenticate };
