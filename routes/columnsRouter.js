const express = require('express');
const controllers = require('../controllers/columnsController');
const { tokenChecker } = require('../utils/updateToken');
const columnsRouter = express.Router();
const { columnNameValidation } = require('../utils/validation');

columnsRouter.get('/', tokenChecker, controllers.getAllColumns);
columnsRouter.post('/' , tokenChecker, controllers.createColumn);
columnsRouter.patch('/' , tokenChecker, controllers.changeColumnName);
columnsRouter.patch('/tasks', tokenChecker, controllers.tasksColumnPosition);
columnsRouter.delete('/', tokenChecker, controllers.deleteColumn);

module.exports = columnsRouter;