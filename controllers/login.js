const { StatusCodes } = require("http-status-codes");
const { register } = require("../models/registerSchema");
const { signIn } = require("../validators/loginJoi");
const { users } = require("../validators/userJoi");
const { team } = require("../models/teamSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secreteKey = process.env.secreteToken;

module.exports.login = async (req, res) => {
  const { error, value } = signIn(req.body);
  if (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
  const user = await register.findOne({ email: value.email });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
  } else {
    try {
      const verify = await bcrypt.compare(value.password, user.password);
      if (!verify) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send("Invalid credentials");
      }
      const token = jwt.sign({ email: signIn.email }, secreteKey, {
        expiresIn: "1h",
      });
      res.cookie("appToken", token, { maxAge: 1000 * 60 * 60 });

      let teams = await team
        .findOne({ teamName: user.teamName })
        .populate("playersId");
      res.status(StatusCodes.ACCEPTED).json({ "Welcome ": teams });
      // .send(`Welcome back ${user.userName} \n ${token}`);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.EXPECTATION_FAILED).send("Login failed");
    }
  }
};
