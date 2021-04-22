const express = require('express');
const controllers = require('../controllers/columnsController');
const { tokenChecker } = require('../utils/updateToken');
const { columnNameValidation } = require('../utils/validation');
const columnsRouter = express.Router();

columnsRouter.get('/', tokenChecker, controllers.getAllColumns);
columnsRouter.post('/' , tokenChecker, columnNameValidation, controllers.createColumn);
columnsRouter.patch('/' , tokenChecker, columnNameValidation, controllers.changeColumnName);
columnsRouter.patch('/tasks', tokenChecker, controllers.tasksColumnPosition);
columnsRouter.delete('/', tokenChecker, controllers.deleteColumn);

module.exports = columnsRouter;