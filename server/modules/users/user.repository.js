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
}

module.exports = new UserRepository();
