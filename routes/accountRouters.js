const express = require('express');
const controllers = require ('../controllers/accountControllers');
const accountController = express.Router();
const { signUpValidation, loginValidation } = require('../middleware/validation');

accountController.post("/signup",signUpValidation ,controllers.signUp);
accountController.post("/signin",loginValidation, controllers.signIn);

module.exports = accountController;