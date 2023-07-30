const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports.register = mongoose.model("user", registerSchema);
