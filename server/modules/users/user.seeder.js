require("dotenv").config();
const User = require("./user.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { getAddressFromCoordinates } = require("../../utils/helpers");
function generateNearbyCoordinate(lat, lng, maxDistanceKm) {
  const radiusInDegrees = maxDistanceKm / 111;

  const u = Math.random();
  const v = Math.random();

  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;

  const latOffset = w * Math.cos(t);
  const lngOffset = (w * Math.sin(t)) / Math.cos((lat * Math.PI) / 180);

  return {
    lat: lat + latOffset,
    lng: lng + lngOffset,
  };
}

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
}

connectDB();
const distanceBuckets = [
  { count: 20, radius: 10 },
  { count: 20, radius: 20 },
  { count: 10, radius: 40 },
];

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash("User@123", 10);

  const users = [];

  let id = 1;

  for (const bucket of distanceBuckets) {
    for (let i = 0; i < bucket.count; i++) {
      const point = generateNearbyCoordinate(
        17.728308,
        83.29863,
        bucket.radius,
      );
      const address = await getAddressFromCoordinates(point.lng, point.lat);
      console.log("address done", id);

      users.push({
        username: `user_${id}`,
        display_name: `Anonymous ${id}`,
        email: `user${id}@trulink.online`,
        password: hashedPassword,
        gender: Math.random() > 0.5 ? "male" : "female",
        role: "user",
        account_type: "permanent",
        address,
        location: {
          type: "Point",
          coordinates: [point.lng, point.lat],
        },
      });

      id++;
    }
  }

  await User.insertMany(users);
  console.log(JSON.stringify(users, null, 2));
};

seedUsers();
