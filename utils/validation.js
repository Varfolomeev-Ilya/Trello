const { celebrate, Joi } = require('celebrate');

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(8).required(),
    email: Joi.string().min(5).email().required()
  }),
});

module.exports = { signUpValidation, loginValidation };
