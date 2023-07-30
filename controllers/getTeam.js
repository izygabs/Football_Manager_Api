const { StatusCodes } = require("http-status-codes");
const { team } = require("../models/teamSchema");

module.exports.getTeam = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(StatusCodes.NOT_FOUND).send("Invalid Id");
    } else {
      const teams = await team.findOne({});
      if (!teams) {
        res.status(StatusCodes.NOT_FOUND).send("Team not found");
      } else {
        res.status(StatusCodes.OK).send(teams);
      }
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send("Couldn't get team");
  }
};
