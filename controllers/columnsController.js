const models = require('../db/models');

exports.getAllColumns = async (req, res, next) => {
  try {
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
    res.json(columns);
  } catch (error) {
    next(error);
  }
};

exports.changeColumnName = async (req, res, next) => {
  try {
    const { name, id } = req.body

    const updateColumn = await models.Column.update(
      { name },
      {
        where: {
          id: id
        },
        returning: true,
        plain: true,
      },
    );
    if (!updateColumn) {
      throw new Error('column not found')
    }
    const column = updateColumn[1].dataValues;
    res.json(column);
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
    res.json(column);
  } catch (error) {
    next(error)
  }
};

exports.createColumn = async (req, res, next) => {
  try {
    const { name, id } = req.body;
    await models.Board.findByPk(id)
    const column = await models.Column.create({
      name: name,
      boardId: id,
    });
    res.json(column);
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
    res.json('column delted');
  } catch (error) {
    next(error)
  }
}