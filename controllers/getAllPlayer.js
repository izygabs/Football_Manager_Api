const { StatusCodes } = require("http-status-codes");
const { players } = require("../models/playerSchema");

module.exports.getPlayers = async (req, res, next) => {
  const value = req.body;
  try {
    const allPlayers = await players.find({ teamName: value.teamName });
    if (!allPlayers) {
      res.status(StatusCodes.NOT_FOUND).send("Players not found");
    } else {
      res.status(StatusCodes.OK).send(allPlayers);
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send("Couldn't get Players");
  }
};
