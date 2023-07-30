const { StatusCodes } = require("http-status-codes");
const { players } = require("../models/playerSchema");
const { updatePlayer } = require("../validators/updatePlayersJoi");

module.exports.updatePlayer = async (req, res, next) => {
  const { value } = updatePlayer(req.body);
  const id = req.params.id;
  if (!id) {
    res.status(StatusCodes.NOT_FOUND).send("Invalid Id");
  } else {
    try {
      const player = await players.findByIdAndUpdate(
        id,
        { $set: value },
        { new: true }
      );
      if (!player) {
        res.status(StatusCodes.NOT_FOUND).send("Player not found");
      } else {
        res.status(StatusCodes.OK).send(player);
      }
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).send("Update failed");
    }
  }
};
