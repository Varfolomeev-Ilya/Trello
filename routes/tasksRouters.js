const express = require('express');
const controllers = require('../controllers/tasksController');
const { tokenChecker } = require('../middleware/updateToken');
const taskRouter = express.Router();

taskRouter.post('/tasks', controllers.createTask);
taskRouter.delete('/tasks', controllers.deleteTasks);
taskRouter.patch('/tasks', controllers.updateTasks);

module.exports = taskRouter;