const express = require('express');
const controllers = require('../controllers/userControllers');
const userRouter = express.Router();
const { tokenChecker } = require('../utils/updateToken');
const { uploadFile, storageConfig, fileFilter } = require('../middleware/loadingAvatar');
const multer = require('multer');

userRouter.get('/me', tokenChecker, controllers.getOneUser);
userRouter.patch('/account', tokenChecker, controllers.updateUser);
userRouter.post('/account', tokenChecker, multer({ storage: storageConfig, filter: fileFilter }).single('filedata'), controllers.uploadFile);

module.exports = userRouter;




