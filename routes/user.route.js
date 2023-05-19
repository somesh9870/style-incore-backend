const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const userRouter = express.Router();

// to register a new user
userRouter.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const emailExists = await UserModel.findOne({ email, email });
    if (emailExists) {
      return res.status(400).send({ msg: "User already exists" });
    }

    bcrypt.hash(password, 4, async (err, hash) => {
      const payload = {
        firstname,
        lastname,
        email,
        password: hash,
      };
      const user = new UserModel(payload);
      await user.save();
      res.status(200).send({ msg: "Registration successful" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//  to sign in a user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Successfully Login",
            token: jwt.sign({ userID: user._id }, "masai"),
          });
        } else {
          return res.status(400).send({ msg: "Incorrect password" });
        }
      });
    } else {
      return res
        .status(400)
        .send({ msg: "Invalid email, Please register first" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = userRouter;
