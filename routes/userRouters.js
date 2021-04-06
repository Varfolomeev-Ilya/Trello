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
userRouter.patch('/account', tokenChecker, updateUserValidation, controllers.updateUser);
userRouter.use(multer({storage:storageConfig, filter:fileFilter}).single('filedata'))
userRouter.post('/account', uploadFile);

module.exports = userRouter;




