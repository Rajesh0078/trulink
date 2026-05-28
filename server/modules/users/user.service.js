const bcrypt = require("bcryptjs");
const {
  getAddressFromCoordinates,
  sendAndSaveOtp,
} = require("../../utils/helpers");
const { sendError } = require("../../utils/response");
const sendEmail = require("../../utils/sendEmail");
const userRepository = require("./user.repository");
const Otp = require("../../common/models/Otp");

class UserService {
  async getProfile(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async upgradeUserRequest(req, res) {
    const id = req.user.id;
    const { email, password } = req.body;
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      return sendError(res, {
        statusCode: 409,
        message: "Email already exists",
      });
    }

    const currentUser = await userRepository.findById(id);
    if (currentUser?.account_type === "permanent") {
      return sendError(res, {
        statusCode: 409,
        message: "Guest users only allowed!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Otp.deleteMany({
      user_id: id,
      purpose: "upgrade_guest",
    });

    const otp = await sendAndSaveOtp({
      user_id: id,
      purpose: "upgrade_guest",
      type: "email",
      email,
      payload: {
        hashed_password: hashedPassword,
      },
    });

    await sendEmail({
      to: email,
      subject: "OTP Verification",
      html: `
        <h2>Your OTP Code</h2>

        <h1>${otp}</h1>

        <p>This OTP expires in 5 minutes.</p>
      `,
    });
    return;
  }

  async upgradeGuestVerify(req, res) {
    const userId = req.user.id;
    const { otp } = req.body;

    const otpDoc = await Otp.findOne({
      user_id: userId,
      otp,
      purpose: "upgrade_guest",
      verified: false,
    });

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
    const user = await userRepository.findByIdWithoutLean(userId);

    if (!user) {
      return sendError(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    user.email = otpDoc.email;
    user.password = otpDoc.payload.hashed_password;
    user.role = "user";
    user.account_type = "permanent";
    const updatedUser = await user.save();

    await Otp.deleteOne({
      _id: otpDoc._id,
    });
    return updatedUser;
  }

  async updateProfile(id, data) {
    const allowedUpdates = [
      "first_name",
      "last_name",
      "avatar",
      "bio",
      "location",
      "settings",
      "interests",
      "dob",
      "display_name",
    ];

    const filteredData = {};

    for (const key of allowedUpdates) {
      if (data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    }

    const user = await userRepository.findByIdWithoutLean(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (
      filteredData.location &&
      filteredData.location.type === "Point" &&
      Array.isArray(filteredData.location.coordinates)
    ) {
      const [newLng, newLat] = filteredData.location.coordinates;

      const oldCoords = user.location?.coordinates;

      const normalize = (n) => Number(n.toFixed(5));

      const isSameLocation =
        oldCoords &&
        normalize(oldCoords[0]) === normalize(newLng) &&
        normalize(oldCoords[1]) === normalize(newLat);

      if (!isSameLocation) {
        const address = await getAddressFromCoordinates(newLng, newLat);

        user.address = address;
      }

      user.location = filteredData.location;
    }

    for (const key of allowedUpdates) {
      if (key !== "location" && filteredData[key] !== undefined) {
        user[key] = filteredData[key];
      }
    }

    const updatedUser = await user.save();

    return updatedUser;
  }

  async discoverProfiles(id, km) {
    const nearByUsers = await userRepository.discoverUsers({
      userId: id,
      radius: km * 1000,
    });
    return nearByUsers;
  }
}

module.exports = new UserService();
