const express = require('express');
const controllers = require ('../controllers/controllers.js');
const loginRouters = express.Router();
const { updateUserValidation, signUpValidation, loginValidation } = require('../middleware/validation');
const { tokenChecker } = require('../middleware/updateToken');

loginRouters.post("/signup",signUpValidation ,controllers.signUp);
loginRouters.post("/signin",loginValidation, controllers.signIn);
loginRouters.put("/update/:id", updateUserValidation, tokenChecker, controllers.putUser);
loginRouters.get("/users", tokenChecker, controllers.getAllUsers);
loginRouters.delete("/delete/:id", tokenChecker, controllers.deleteUser);
loginRouters.get("/user/:id", controllers.getOneUser);

module.exports = loginRouters;




