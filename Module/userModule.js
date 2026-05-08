const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  isActive: Boolean,
});

const userModel = mongoose.model("User", userSchema);

module.exports= userModel;