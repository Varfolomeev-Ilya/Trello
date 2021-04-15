require('dotenv').config();
const { response } = require('express');
const models = require('../db/models');

exports.createTask = async (req,res,next) => {
    try{
        const column = await models.Column.findByPk(req.body.columnId);

        if (!column) {
            throw new Error('column not found');
        }

        const task = await column.createTask({
            text: req.body.text
        });
        res.status(201).json(task)

    } catch (error) {
        next(error);
    };
};

exports.deleteTasks = async (req,res,next) => {
    try{
        const task = await models.Task.findByPk(req.body.taskDelId);

        if (!task) {
            throw new Error ('Task not found');
        }

        await models.Task.destroy({
            where : {
                id: req.body.taskDelId,
            }
        })
        res.status(200).json('task was deleted');
    } catch (error) {
        next(error);
    }
};

exports.updateTasks = async (req,res,next) => {
    try {
        const task = await models.Task.update(
        { text: req.body.text },
        {
            where: { id: req.body.taskId },
        },
        );

        if (!task) {
        throw new Error ('task not found');
        }
    res.status(200).json('task was updated');
    } catch (error) {
        next(error);
    }
};