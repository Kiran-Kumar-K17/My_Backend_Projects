const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const sign = (u) =>
  jwt.sign({ id: u._id, username: u.username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.status(201).json({ message: "Registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({ token: sign(user) });
});

module.exports = router;
