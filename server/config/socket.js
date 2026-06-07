const { Server } = require("socket.io");
const { verifyAccessToken } = require("../utils/jwt");

let io;
const onlineUsers = new Map();

function emitOnlineUsers() {
  io.emit("online-users", Array.from(onlineUsers.keys()));
}

function addUser(userId, socketId) {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }

  onlineUsers.get(userId).add(socketId);
}

function removeUser(userId, socketId) {
  if (!onlineUsers.has(userId)) return;

  const sockets = onlineUsers.get(userId);
  sockets.delete(socketId);

  if (sockets.size === 0) {
    onlineUsers.delete(userId);
  }
}

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL || "http://localhost:3000"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake?.auth?.token;
      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }
      const decoded = verifyAccessToken(token);
      socket.user = decoded;

      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user._id || socket.user.id;

    addUser(userId, socket.id);

    emitOnlineUsers();

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);

      removeUser(userId, socket.id);

      emitOnlineUsers();

      if (!onlineUsers.has(userId)) {
        io.emit("user-offline", userId);
      }
    });
  });
}

module.exports = initSocket;
