const express = require('express');
const controllers = require('../controllers/accountControllers');
const accountRouter = express.Router();
const { signUpValidation, loginValidation } = require('../utils/validation');

accountRouter.post('/sign-up', signUpValidation, controllers.signUp);
accountRouter.post('/sign-in', loginValidation, controllers.signIn);

module.exports = accountRouter;
