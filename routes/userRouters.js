const express = require('express');
const controllers = require ('../controllers/userControllers');
const userRouter = express.Router();
const { updateUserValidation } = require('../middleware/validation');
const { tokenChecker } = require('../middleware/updateToken');

userRouter.put("/update/:id", updateUserValidation, tokenChecker, controllers.putUser);
userRouter.get("/users", tokenChecker, controllers.getAllUsers);
userRouter.delete("/delete/:id", tokenChecker, controllers.deleteUser);
userRouter.get("/user/:id", controllers.getOneUser);

module.exports = userRouter;




