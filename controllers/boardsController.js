const models = require('../db/models');


exports.getBoards = async (req,res,next) => {
  try{
    const { userId } = req.query;
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw new Error('User not found')
    }
    const allBoards = await user.getBoards();
    res.json(allBoards);
  } catch(error){
    res.status(200).json(allBoards);
  }
};

exports.createBoard = async (req, res, next) => {
  try {
    const { name, id } = req.body;
    const user = await models.User.findByPk(id);
    if(!user) {
      throw new Error('user not found');
    }

    const board = await models.Board.create({
      name: name,
      userId: id
    });

    res.json(board);
  } catch (error) {
    next(error);
  }
};

exports.deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.body;
    await models.Board.destroy({
      where: {
        id: boardId
      }
    })
    res.json('board delete')
  } catch (error) {
    next(error);
  }
};

exports.changeBoardName = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const updateBoard = await models.Board.update(
      { name },
      {
        where: {
          id: id
        },
        returning: true,
        plain: true,
      },
    );
      if(!updateBoard) {
        throw new Error('board not found')
      }
      const board = updateBoard[1].dataValues;
      res.json(board)
    if (!updateBoard) {
      throw new Error('board not found')
    }
    const board = updateBoard[1].dataValues;
    res.status(200).json(board)
  } catch (error) {
    next(error);
  }
}

exports.columnsBoardPosition = async (req, res, next) => {
  try {
    const { boardId, columnsPosition } = req.body;
    const updateBoard = await models.Board.update(
      { columnsPosition: columnsPosition },
      {
        where: {
          id: boardId
        },
        returning: true,
        plain: true,
      },
    );
    if (!updateBoard) {
      throw new Error('board not found')
    }
    const board = updateBoard[1].dataValues;
    res.json(board)
      if(!updateBoard) {
        throw new Error('board not found')
      }
      const board = updateBoard[1].dataValues;
      res.json(board)
  } catch (error) {
    next(error);
  }
};
