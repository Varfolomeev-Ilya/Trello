const express = require('express');
const controllers = require('../controllers/tasksController');
const { tokenChecker } = require('../middleware/updateToken');
const taskRouter = express.Router();

taskRouter.post('/tasks', tokenChecker, controllers.createTask);
taskRouter.delete('/tasks', tokenChecker, controllers.deleteTasks);
taskRouter.patch('/tasks', tokenChecker, controllers.updateTasks);

module.exports = taskRouter;