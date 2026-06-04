const Otp = require("../../common/models/Otp");
const {
  getAddressFromCoordinates,
  sendAndSaveOtp,
} = require("../../utils/helpers");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");
const { sendError } = require("../../utils/response");
const sendEmail = require("../../utils/sendEmail");
const userRepository = require("../users/user.repository");
const bcrypt = require("bcryptjs");

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

  async registerRequest(req, res) {
    const { username, password, ...rest } = req.body;
    const query = [];

    if (username) {
      query.push({ username });
    }

    if (rest.email) {
      query.push({ email: rest.email });
    }

    if (rest.phone) {
      query.push({ phone: rest.phone });
    }
    const existingUser = await userRepository.findUserByQuery({ $or: query });
    if (existingUser) {
      if (existingUser.username === username) {
        return sendError(res, {
          statusCode: 409,
          message: "Username already taken!",
        });
      }

      if (existingUser.email === rest.email) {
        return sendError(res, {
          statusCode: 409,
          message: "Email already exists",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Otp.deleteMany({
      $or: [{ email: rest.email }, { phone: rest.phone }],
      purpose: "register",
    });

    // Email Flow
    if (rest.email) {
      const otp = await sendAndSaveOtp({
        type: "email",
        email: rest.email,
        payload: {
          ...rest,
          password: hashedPassword,
          username,
        },
        purpose: "register",
      });
      await sendEmail({
        to: rest.email,
        subject: "OTP Verification",
        html: `
          <h2>Your OTP Code</h2>
  
          <h1>${otp}</h1>
  
          <p>This OTP expires in 5 minutes.</p>
        `,
      });
      return;
    }
  }

  async registerVerify(req, res) {
    const { otp, ...rest } = req.body;
    const otpDoc = await Otp.findOne({
      $or: [{ email: rest.email }, { phone: rest.phone }],
      otp,
      purpose: "register",
      verified: false,
    }).lean();

    if (!otpDoc) {
      return sendError(res, {
        statusCode: 400,
        message: "Invalid OTP",
      });
    }

    if (otpDoc.expires_at < new Date()) {
      return sendError(res, {
        statusCode: 400,
        message: "OTP expired",
      });
    }

    const { payload, email, phone } = otpDoc;
    const query = [{ username: payload.username }];
    if (email) {
      query.push({ email });
    }
    if (phone) {
      query.push({ phone });
    }

    const existingUser = await userRepository.findUserByQuery({ $or: query });
    if (existingUser) {
      if (existingUser.username === username) {
        return sendError(res, {
          statusCode: 409,
          message: "Username already taken!",
        });
      }

      if (existingUser.email === rest.email) {
        return sendError(res, {
          statusCode: 409,
          message: "Email already exists",
        });
      }
    }

    await Otp.deleteOne({
      _id: otpDoc._id,
    });

    const location = payload.location;
    if (location?.type === "Point") {
      const [newLng, newLat] = location.coordinates;
      const address = await getAddressFromCoordinates(newLng, newLat);
      payload.address = address;
    }

    const user = await userRepository.createUser(payload);
    const tokens = await this._issueTokens(user);
    return { user, ...tokens };
  }
}

module.exports = new AuthService();
