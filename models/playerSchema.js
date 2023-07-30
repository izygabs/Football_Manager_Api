const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  teamName: {
    type: String,
    required: true,
  },
  marketValue: {
    type: Number,
    default: 1000000,
  },
  transferList: {
    type: Boolean,
    default: false,
  },
  transferPrice: {
    type: Number,
    default: 0,
  },
});

module.exports.players = mongoose.model("player", playerSchema);
