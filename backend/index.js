const dotenv = require("dotenv");
const config = require("./config.json");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/create-account", (req, res) => {
  return res.status(200).send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

module.exports = app;
