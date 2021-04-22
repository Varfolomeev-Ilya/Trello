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
    email: Joi.string().min(5).email().required(),
  }),
});

const userRoleIdValidation = celebrate({
  body: Joi.object().keys({
    roleId: Joi.string().required().pattern(/^(admin|user)$/),
  }),
});

const boardNameValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(20),
  }),
});

const taskTextValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    text: Joi.string().required().max(20),
  }),
});

const columnNameValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(20),
    text: Joi.string().required().max(20),
  }),
});


module.exports = {
  signUpValidation,
  loginValidation,
  userRoleIdValidation,
  boardNameValidation,
  taskTextValidation,
  columnNameValidation,
};
