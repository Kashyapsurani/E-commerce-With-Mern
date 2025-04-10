const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  await User.create(req.body);
  res.redirect("/login");
}; 

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    console.log(user);
    console.log(user);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.cookie("token", token).redirect("/products");
  } else {
    res.send("Invalid credentials");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").redirect("/login");
};
