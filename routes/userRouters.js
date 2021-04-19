const express = require('express');
const controllers = require('../controllers/userControllers');
const userRouter = express.Router();
const { tokenChecker } = require('../middleware/updateToken');
const { uploadFile, storageConfig, fileFilter } = require('../middleware/loadingAvatar');
const multer = require('multer');

userRouter.get('/user/me', tokenChecker, controllers.getOneUser);
userRouter.patch('/account', tokenChecker, controllers.updateUser);
userRouter.use(multer({storage:storageConfig, filter:fileFilter}).single('filedata'));
userRouter.post('/account', tokenChecker, controllers.uploadFile);

module.exports = userRouter;




