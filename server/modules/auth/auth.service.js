const { getAddressFromCoordinates } = require("../../utils/helpers");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");
const { sendError } = require("../../utils/response");
const userRepository = require("../users/user.repository");

class AuthService {
  async guest(data) {
    let payload = { ...data, account_type: "guest" };
    if (data?.location?.type === "Point") {
      const [newLng, newLat] = data.location.coordinates;
      const address = await getAddressFromCoordinates(newLng, newLat);
      payload.address = address;
    }
    const guestUser = await userRepository.createUser(payload);

    const tokens = await this._issueTokens(guestUser);

    return { user: guestUser, ...tokens };
  }

  async _issueTokens(user) {
    const payload = {
      id: user._id.toString(),
      role: user.role,
      account_type: user.account_type,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async login(req, res) {
    const data = req.body;
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      return sendError(res, {
        statusCode: 404,
        message: "User not found",
      });
    }
    const tokens = await this._issueTokens(user);
    return { user, ...tokens };
  }
}

module.exports = new AuthService();
