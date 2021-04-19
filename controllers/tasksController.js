require('dotenv').config();
const models = require('../db/models');

exports.createTask = async (req, res, next) => {
    try {
        const { columnId, text } = req.body;

        const column = await models.Column.findByPk(columnId);

        if (!column) {
            throw new Error('column not found');
        }

        const task = await column.createTask({
            text: text
        });
        res.status(201).json(task)

    } catch (error) {
        next(error);
    };
};

exports.deleteTasks = async (req, res, next) => {
    try {
        const { taskDelId } = req.body;

        const task = await models.Task.findByPk(taskDelId);
        if (!task) {
            throw new Error('Task not found');
        }

        await models.Task.destroy({
            where: {
                id: taskDelId,
            }
        })
        res.status(200).json('task was deleted');
    } catch (error) {
        next(error);
    }
};

exports.updateTasks = async (req, res, next) => {
    try {
        const { text, taskId } = req.body;
        const task = await models.Task.update(
            { text: text },
            {
                where: { id: taskId },
            },
        );

        if (!task) {
            throw new Error('task not found');
        }
        res.status(200).json('task was updated');
    } catch (error) {
        next(error);
    }
};

exports.changeTasksColumnId = async (req, res, next) => {
    try {
        const { columnId, taskId } = req.body;
        const task = await models.Task.update(
            { columnId: columnId },
            {
                where: { id: taskId },
            },
        );

        if (!task) {
            throw new Error('task not found');
        }
        res.status(200).json('task was changed');
    } catch (error) {
        next(error);
    }
}