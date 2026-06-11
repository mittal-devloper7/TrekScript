const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
