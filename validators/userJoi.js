const Joi = require("joi");

const users = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().trim(),
    email: Joi.string().required().trim(),
    password: Joi.string().required(),
    teamName: Joi.string().required(),
    country: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.users = users;
