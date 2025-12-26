const Message = require("../models/Message.js");

const chatHandler = (io, socket) => {
  socket.on("join-room", async (roomId) => {
    socket.join(roomId);

    const chatMessages = await Message.find({ roomId }).sort({ createdAt: 1 });
    socket.emit("chat-history", chatMessages);
  });

  socket.on("user-message", async ({ roomId, text }) => {
    if (!text) return;
    const msg = await Message.create({
      roomId,
      sender: socket.user.username, // trusted
      text,
    });
    io.to(roomId).emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
};

module.exports = chatHandler;
