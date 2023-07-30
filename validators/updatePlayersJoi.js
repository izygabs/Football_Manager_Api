const Joi = require("joi");

const updatePlayer = (data) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    country: Joi.string(),
    transferList: Joi.boolean(),
    transferPrice: Joi.number(),
  });
  return schema.validate(data);
};

module.exports.updatePlayer = updatePlayer;
