const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send("User already exists.");
  }

  const user = new User({ username, password, role });
  await user.save();
  res.status(201).send("User registered successfully.");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  // Check if the password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  // Create JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token expiration time
    }
  );

  // Set token as a cookie
  res.cookie("token", token, { httpOnly: true });
  res.status(200).send("Logged in successfully.");
};

exports.logout = (req, res) => {
  res.clearCookie("token").send("Logged out successfully.");
};
