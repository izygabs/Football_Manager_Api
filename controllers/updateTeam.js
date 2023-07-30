const { StatusCodes } = require("http-status-codes");
const { team } = require("../models/teamSchema");
const { updateTeam } = require("../validators/updateTeamJoi");

module.exports.updateTeam = async (req, res, next) => {
  const id = req.params.id;
  const { value } = updateTeam(req.body);
  if (!id) {
    res.status(StatusCodes.NOT_FOUND).send("Invalid Id");
  } else {
    try {
      const teams = await team.findByIdAndUpdate(
        id,
        { $set: value },
        { new: true }
      );
      if (!teams) {
        res.status(StatusCodes.NOT_FOUND).send("Team not Found");
      } else {
        res.status(StatusCodes.OK).send(teams);
      }
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send("Failed to update");
    }
  }
};
