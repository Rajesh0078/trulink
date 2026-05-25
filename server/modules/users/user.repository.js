const User = require("./user.model");
class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email }).select("+password").lean();
  }

  async findById(id) {
    return User.findById(id).lean({ virtuals: true });
  }

  async findByIdWithoutLean(id) {
    return User.findById(id);
  }

  async createUser(data) {
    const user = new User(data);
    await user.save();
    return user;
  }

  async updateUser(id, data) {
    return User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    }).lean();
  }

  async discoverUsers({ userId, radius = 10000 }) {
    const currentUser = await User.findById(userId)
      .select("location.coordinates")
      .lean();

    if (!currentUser) {
      return [];
    }

    return User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: currentUser.location.coordinates,
          },

          distanceField: "distance",
          maxDistance: radius,
          spherical: true,
        },
      },

      {
        $match: {
          _id: { $ne: currentUser._id },
          is_active: true,
          "location.coordinates": {
            $ne: [0, 0],
          },
        },
      },
    ]);
  }
}

module.exports = new UserRepository();
