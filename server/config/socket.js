const { Server } = require("socket.io");
const { verifyAccessToken } = require("../utils/jwt");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake?.auth?.token;
      console.log(token);
      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }
      const decoded = verifyAccessToken(token);
      // const user = await User.findById(decoded._id || decoded.id).select('-password');
      // if (!user) return next(new Error('User not found'));
      socket.user = decoded;

      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", async (socket) => {
    console.info(`socket connect with id - ${socket.id}`);
  });
}

module.exports = initSocket;
