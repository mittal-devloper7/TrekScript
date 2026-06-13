require("dotenv").config();
const config = require("./config.json");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

mongoose.connect(config.connectionString);

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
