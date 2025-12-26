const jwt = require("jsonwebtoken");
const chatHandler = require("./chat.handlers");

const socketInit = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) throw new Error("No token");
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      next(new Error("Auth failed"));
    }
  });

  io.on("connection", (socket) => {
    chatHandler(io, socket);
  });
};

module.exports = socketInit;
