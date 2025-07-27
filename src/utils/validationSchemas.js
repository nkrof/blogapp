const Joi = require("joi");

const validator = (schema) => (data) =>
  schema.validate(data, { abortEarly: false });

const userSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .max(16)
    .regex(/^\S*$/, "no spaces")
    .lowercase(),
  displayName: Joi.string()
    .optional()
    .min(3)
    .max(24)
    .default(Joi.ref("username")),
  password: Joi.string().required().regex(/^\S*$/, "no spaces").min(6).max(32),
  //confirmPassword: Joi.ref("password"),
});

const postSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .max(16)
    .regex(/^\S*$/, "no spaces")
    .lowercase(),
  titleName: Joi.string().required().max(32),
  description: Joi.string().required().max(256),
  date: Joi.date().required(),
  //confirmPassword: Joi.ref("password"),
});

module.exports = { userSchema, postSchema };
