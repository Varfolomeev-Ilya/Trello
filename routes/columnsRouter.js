const express = require('express');
const controllers = require('../controllers/columnsController');
const { tokenChecker } = require('../middleware/updateToken');
const columnsRouter = express.Router();

columnsRouter.get('/column', tokenChecker, controllers.getColumns);
columnsRouter.post('/column' , tokenChecker, controllers.createColumn);
columnsRouter.patch('/column' , tokenChecker, controllers.changeColumnName);
columnsRouter.patch('/column-tasks', tokenChecker, controllers.tasksColumnPosition);
columnsRouter.delete('/column', tokenChecker, controllers.deleteColumn);

module.exports = columnsRouter;