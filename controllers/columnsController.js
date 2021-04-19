require('dotenv').config();
const models = require('../db/models');

exports.getAllColumns = async (req, res, next) => {
  try {
    // if(!req.query.boardId){
    //   throw new Error("")
    // }
    const { boardId } = req.query;
    const board = await models.Board.findByPk(boardId);
    if (!board) {
      throw new Error('Board not found')
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
  } catch (error) {
    next(error);
  }
};

exports.changeColumnName = async (req, res, next) => {
  try {
    const { columnName, columnId } = req.body

    const updateColumn = await models.Column.update(
      { name: columnName },
      {
        where: {
          id: columnId
        },
        returning: true,
        plain: true,
      },
    );
    if (!updateColumn) {
      throw new Error('column not found')
    }
    const column = updateColumn[1].dataValues;
    res.status(200).json(column);
  } catch (error) {
    next(error)
  }
};

exports.tasksColumnPosition = async (req, res, next) => {
  try {
    const { columnId, tasksPosition } = req.body;

    const updateColumn = await models.Column.update(
      { tasksPosition: tasksPosition },
      {
        where: {
          id: columnId
        },
        returning: true,
        plain: true,
      },
    );
    if (!updateColumn) {
      throw new Error('column not found')
    }
    const column = updateColumn[1].dataValues;
    res.status(200).json(column);
  } catch (error) {
    next(error)
  }
};

exports.createColumn = async (req, res, next) => {
  try {
    const { name, boardId } = req.body;
    await models.Board.findByPk(boardId)
    const column = await models.Column.create({
      name: name,
      boardId: boardId,
    });
    res.status(200).json(column);
  } catch (error) {
    next(error);
  }
};

exports.deleteColumn = async (req, res, next) => {
  try {
    const { columnId } = req.body;
    const column = await models.Column.destroy({
      where: {
        id: columnId
      }
    })
    res.status(200).json('column delted');
  } catch (error) {
    next(error)
  }
}