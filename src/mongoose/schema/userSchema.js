const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  displayName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  lastActiveAt: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
