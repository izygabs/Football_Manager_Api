const { StatusCodes } = require("http-status-codes");
const { players } = require("../models/playerSchema");

module.exports.transferPlayer = async (req, res, next) => {
  try {
    // const id = req.params.id;
    const transferedPlayer = await players.findOne({
      transferList: true,
    });
    if (!transferedPlayer) {
      res.status(StatusCodes.NOT_FOUND).send("Player not found");
    } else {
      res.status(StatusCodes.OK).send(transferedPlayer);
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("Could not get any player on transfer");
  }
};
