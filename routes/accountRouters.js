const express = require('express');
const controllers = require ('../controllers/accountControllers');
const accountController = express.Router();
const { signUpValidation, loginValidation } = require('../middleware/validation');
const { uploadFile, storageConfig, fileFilter  } = require('../middleware/loadingAvatar');
const multer = require('multer')

accountController.post("/signup",signUpValidation, controllers.signUp);
accountController.post("/signin",loginValidation, controllers.signIn);

accountController.post("/upload.hbs", uploadFile);
accountController.use(multer({storage:storageConfig, filter:fileFilter}).single("filedata"));




module.exports = accountController;