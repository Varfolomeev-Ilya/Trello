const express = require('express');
const controllers = require ('../controllers/userControllers');
const userRouter = express.Router();
const { updateUserValidation } = require('../middleware/validation');
const { tokenChecker } = require('../middleware/updateToken');
const { uploadFile, storageConfig, fileFilter  } = require('../middleware/loadingAvatar');
const multer = require('multer')

userRouter.get("/admin", tokenChecker, controllers.getAllUsers);
userRouter.delete("/delete/:id", tokenChecker, controllers.deleteUser);
userRouter.get("/user/:id", tokenChecker, controllers.getOneUser);

userRouter.put("/account" , tokenChecker, controllers.putUser);

// userRouter.post("/account", uploadFile);
// userRouter.use(multer({dest:"avatars"}, {storage:storageConfig, filter:fileFilter}).single("filedata"));

module.exports = userRouter;




