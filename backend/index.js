const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config();
const User = require("./models/user_model");
const { authenticateToken } = require("./utilities");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

//Account Creation
app.post("/create-account", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All Fields are Required" });
  }

  const isUser = await User.findOne({ $or: [{ username }, { email }] });
  if (isUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const accessToken = jwt.sign(
    { userId: newUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3h" },
  );

  return res.status(201).json({
    error: false,
    user: { username: newUser.username, email: newUser.email },
    accessToken,
    message: "Registration successful",
  });
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Fields are Required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3h" },
  );

  return res.status(200).json({
    error: false,
    message: "Login successful",
    user: { username: user.username, email: user.email },
    accessToken,
  });
});

//get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  const isUser = await User.findOne({ _id: userId });
  if (!isUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.json({
    error: false,
    user: { username: isUser.username, email: isUser.email },
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

module.exports = app;
