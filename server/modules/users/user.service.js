const { getAddressFromCoordinates } = require("../../utils/helpers");
const userRepository = require("./user.repository");

class UserService {
  async getProfile(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
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
