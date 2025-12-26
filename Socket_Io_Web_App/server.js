require("dotenv").config();
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const socketInit = require("./socket");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// middlewares
app.use(express.json());
app.use(express.static(path.resolve("./public")));
app.use("/auth", require("./routes/auth"));

// database
connectDB();

// sockets
socketInit(io);

// server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/login", (req, res) => {
  const user = {
    id: "1",
    username: "test-user",
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});
