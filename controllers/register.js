const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { users } = require("../validators/userJoi");
const { register } = require("../models/registerSchema");
const { StatusCodes } = require("http-status-codes");
const { team } = require("../models/teamSchema");
const { players } = require("../models/playerSchema");
const createRandomPlayers = require("./createPlayer");

module.exports.registration = async (req, res) => {
  const { error, value } = users(req.body);
  if (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
  try {
    const userExist = await register.findOne({ email: value.email });
    if (userExist) {
      res.status(StatusCodes.CONFLICT).send("User exist already");
    } else {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(value.password, salt);
      const manager = new register({
        userName: value.userName,
        email: value.email,
        password: hashPassword,
        teamName: value.teamName,
      });
      let newManager = await manager.save();

      if (newManager) {
        const teams = new team({
          teamName: value.teamName,
          country: value.country,
          playersId: [],
        });
        const teamExist = await team.findOne({ teamName: value.teamName });
        if (teamExist) {
          res.status(StatusCodes.CONFLICT).send("Team name exist");
        }

        let newTeams = await teams.save();

        if (newTeams) {
          const player = createRandomPlayers(20, value.teamName);
          const teamPlayers = await players.insertMany(player);
          if (teamPlayers) {
            for (let player of teamPlayers) {
              await team.updateOne(
                { _id: newTeams._id },
                { $addToSet: { playersId: player._id } }
              );
            }
          }
        }
      }
      res.status(StatusCodes.CREATED).send("Account created successfully");
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ "Registration failed": error });
  }
};
