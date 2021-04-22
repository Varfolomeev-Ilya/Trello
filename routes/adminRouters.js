const express = require('express');
const controllers = require('../controllers/adminController');
const { tokenChecker } = require('../utils/updateToken');
const { userRoleIdValidation } = require('../utils/validation');
const adminRouter = express.Router();

adminRouter.get('/', tokenChecker, userRoleIdValidation, controllers.getAllUsers);
adminRouter.patch('/user', tokenChecker, controllers.updateOneUser);
adminRouter.delete('/user-delete', tokenChecker, controllers.deleteUser);

module.exports = adminRouter;