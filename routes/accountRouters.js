const express = require('express');
const controllers = require ('../controllers/accountControllers');
const accountRouter = express.Router();
const { signUpValidation, loginValidation } = require('../middleware/validation');

accountRouter.post("/signup",signUpValidation, controllers.signUp);
accountRouter.post("/signin",loginValidation, controllers.signIn);

module.exports = accountRouter;