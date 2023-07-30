const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  teamValue: {
    type: Number,
    default: 20000000,
  },
  additionalValue: {
    type: Number,
    default: 5000000,
  },
  playersId: [{ type: mongoose.Schema.Types.ObjectId, ref: "player" }],
});

module.exports.team = new mongoose.model("team", teamSchema);
