const mongoose = require("mongoose");
const { use } = require("react");
const Schema = mongoose.Schema;

const trekScriptSchema = new Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  visitedLocations: { type: [String], default: [] },
  isFavourite: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: Date, default: Date.now },
  imageUrl: { type: String, required: false },
  visitedDate: { type: Date, required: false },
});

module.exports = mongoose.model("TrekScript", trekScriptSchema);
