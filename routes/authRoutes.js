const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  requireAuth,
  checkRole,
} = require("../controllers/authController");

router.get("/login", (req, res) => res.render("login")); // Render login page
router.get("/register", (req, res) => res.render("register")); // Render register page

router.post("/register", register); // Register a new user
router.post("/login", login); // Log in a user
router.get("/logout", logout); // Log out the user


module.exports = router;
