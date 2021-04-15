require('dotenv').config();
const { response } = require('express');
const models = require('../db/models');

exports.getColumns = async (req,res,next) => {
    try{
      const board = await models.Board.findByPk(req.query.boardId);
      if (!board) {
        throw new Error ('Board not found')
      }
      const columns = await board.getColumns({
        include: [{
          model: models.Task,
          as: 'Tasks',
        }],
        order: [
          ['id', 'ASC'],
          ['Tasks', 'id', 'ASC'],
        ],
      });
      res.status(200).json(columns);
    } catch(error){
      next(error);
    }
  };

  exports.changeColumnName = async (req,res,next) => {
    try{
      const updateColumn = await models.Column.update(
         { name: req.body.columnName },
      {
        where: {
          id: req.body.columnId
        },
        returning: true,
        plain: true,
      },
      );
      if(!updateColumn) {
        throw new Error('column not found')
      }
      const column = updateColumn[1].dataValues;
      res.status(200).json(column);
    } catch(error) {
      next(error)
    }
  };

  exports.createColumn = async (req,res,next) => {
    try{
      await models.Board.findByPk(req.body.boardId)
    
      const column = await models.Column.create({
        name: req.body.name,
        boardId: req.body.boardId,
      });
      res.status(200).json(column);
    } catch (error) {
      next(error);
    }
  };

  exports.deleteColumn = async (req,res,next) => {
    try{
      const column = await models.Column.destroy({
        where: {
          id: req.body.columnId
        }
      })
      res.status(200).json('column delted');
    }catch (error) {
      next(error)
    }
  }