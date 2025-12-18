import { User } from "../models/users.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Field are Required" });
    }

    //check exist
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User Registered",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    //checking if user exist or not

    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    //compare password

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    res.status(200).json({
      message: "User Loged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
export { registerUser, loginUser, logoutUser };
