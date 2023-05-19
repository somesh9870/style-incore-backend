const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    firstname: String,
    lastname: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
