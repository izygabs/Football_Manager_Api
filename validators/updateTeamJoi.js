const Joi = require("joi");

const updateTeam = (data) => {
  const schema = Joi.object({
    teamName: Joi.string(),
    country: Joi.string(),
  });
  return schema.validate(data);
};
module.exports.updateTeam = updateTeam;
