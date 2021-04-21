const express = require('express');
const controllers = require('../controllers/adminController');
const { tokenChecker } = require('../utils/updateToken');
const adminRouter = express.Router();
const { userRoleIdValidation } = require('../utils/validation');

adminRouter.get('/', tokenChecker, userRoleIdValidation, controllers.getAllUsers);
adminRouter.patch('/user', tokenChecker, controllers.updateOneUser);
adminRouter.delete('/user-delete', tokenChecker, controllers.deleteUser);

module.exports = adminRouter;