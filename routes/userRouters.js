const express = require('express');
const controllers = require('../controllers/userControllers');
const userRouter = express.Router();
const { updateUserValidation } = require('../utils/validation');
const { tokenChecker } = require('../middleware/updateToken');
const { uploadFile, storageConfig, fileFilter } = require('../middleware/loadingAvatar');
const multer = require('multer')

userRouter.get('/admin', controllers.getAllUsers);
userRouter.get('/admin', controllers.getOneUser);
userRouter.delete('/delete/:id', tokenChecker, controllers.deleteUser);
userRouter.patch('/account', tokenChecker, controllers.updateUser);
userRouter.post('/account', uploadFile);

module.exports = userRouter;




