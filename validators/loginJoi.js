const Joi = require("joi");

const signIn = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.signIn = signIn;
