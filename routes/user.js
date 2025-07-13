const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST: Register with number
router.post("/register", async (req, res) => {
  const { name, email, number, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists");
    const user = new User({ name, email, number, password });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.send("Registration error");
  }
});

// POST: Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.send("Invalid credentials");

  req.session.userId = user._id;     // for secure identification
  req.session.user = {               // save useful details for profile/home
    name: user.name,
    email: user.email,
    number: user.number
  };

  res.redirect("/"); // Go to homepage after login
});

// GET: Profile
router.get("/profile", (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect("/login");

  res.render("profile", { user });
});

// GET: Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
