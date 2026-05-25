const mongoose = require("mongoose");

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/kindrd";

    mongoose.connection.on("connected", () =>
      console.info("✅ MongoDB connected"),
    );
    mongoose.connection.on("error", (err) =>
      console.error("MongoDB error:", err),
    );
    mongoose.connection.on("disconnected", () =>
      console.warn("MongoDB disconnected"),
    );

    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
