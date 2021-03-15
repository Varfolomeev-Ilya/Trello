const express = require('express');
const controllers = require ('../controllers/userControllers');
const userRouter = express.Router();
const { updateUserValidation } = require('../middleware/validation');
const { tokenChecker } = require('../middleware/updateToken');
const { uploadFile, storageConfig, fileFilter  } = require('../middleware/loadingAvatar');
const multer = require('multer')

userRouter.put("/update/:id", updateUserValidation, tokenChecker, controllers.putUser);
userRouter.get("/users", tokenChecker, controllers.getAllUsers);
userRouter.delete("/delete/:id", tokenChecker, controllers.deleteUser);
userRouter.get("/user/:id", controllers.getOneUser);

userRouter.post("/upload.hbs", uploadFile);
userRouter.use(multer({storage:storageConfig, filter:fileFilter}).single("filedata"));

module.exports = userRouter;




