const express = require('express');
const controllers = require ('../controllers/accountControllers');
const accountController = express.Router();
const { signUpValidation, loginValidation } = require('../middleware/validation');
const { uploadFile } = require('../middleware/loading avatar');

accountController.post("/signup",signUpValidation, controllers.signUp);
accountController.post("/signin",loginValidation, controllers.signIn);
accountController.post("/upload.hbs",signUpValidation, uploadFile, controllers.signUp)

module.exports = accountController;