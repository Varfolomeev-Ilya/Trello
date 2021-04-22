const express = require('express');
const controllers = require('../controllers/tasksController');
const { tokenChecker } = require('../utils/updateToken');
const { taskTextValidation } = require('../utils/validation');
const taskRouter = express.Router();
const { taskTextValidation } = require('../utils/validation');

taskRouter.post('/', tokenChecker, taskTextValidation, controllers.createTask);
taskRouter.delete('/', tokenChecker, controllers.deleteTasks);
taskRouter.patch('/', tokenChecker, taskTextValidation, controllers.updateTasks);
taskRouter.patch('/column', tokenChecker, controllers.changeTasksColumnId)

module.exports = taskRouter;