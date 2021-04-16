const express = require('express');
const controllers = require('../controllers/adminController');
const { tokenChecker } = require('../middleware/updateToken');
const adminRouter = express.Router();

adminRouter.get('/admin', tokenChecker, controllers.getAllUsers);
adminRouter.patch('/admin/user', tokenChecker, controllers.updateOneUser);

module.exports = adminRouter;