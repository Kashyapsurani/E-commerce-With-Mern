const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).send("You must be logged in to access this page.");
  }

  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid or expired token.");
    }

    // Attach the user info to the request object
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    req.user = user; // Attach the user to the request object for further use
    next();
  });
};

exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({
        message: `Access denied. You need to have the ${role} role to access this page.`,
      });
    }
  };
};
