const express = require('express');
const controllers = require('../controllers/tasksController');
const { tokenChecker } = require('../utils/updateToken');
const taskRouter = express.Router();
const { taskTextValidation } = require('../utils/validation');

taskRouter.post('/', tokenChecker, controllers.createTask);
taskRouter.delete('/', tokenChecker, controllers.deleteTasks);
taskRouter.patch('/', tokenChecker, controllers.updateTasks);
taskRouter.patch('/column', tokenChecker, controllers.changeTasksColumnId)

module.exports = taskRouter;