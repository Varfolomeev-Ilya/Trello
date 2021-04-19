require('dotenv').config();
const models = require('../db/models');

exports.getBoards = async (req,res,next) => {
  try{
    const { userId } = req.query;
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw new Error ('User not found')
    }
    const allBoards = await user.getBoards();
    res.status(200).json(allBoards);
  } catch(error){
    next(error);
  }
};

exports.createBoard = async (req, res) => {
  try {
    const { name, email, id } = req.body;
    await models.User.findOne({
      where: { email },
    });

    const board = await models.Board.create({
      name: name,
      userId: id
    });

    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.body;
    const deleteBoard = await models.Board.destroy({
       where: {
          id:boardId
           } 
    })
    res.status(200).json('board delete')
  } catch (error) {
      next(error);
  }
};

exports.changeBoardName = async (req,res,next) => {
  try {
    const { boardId, boardName } = req.body;
    const updateBoard = await models.Board.update(
      { name: boardName },
      {
        where: {
          id: boardId
        },
        returning: true,
        plain: true,
      },
    );
      if(!updateBoard) {
        throw new Error('board not found')
      }
      const board = updateBoard[1].dataValues;
      res.status(200).json(board)
  } catch (error) {
    next(error);
  }
}

exports.columnsBoardPosition = async (req,res,next) => {
  try {
    const { boardId, columnPosition } = req.body;
    const updateBoard = await models.Board.update(
      { position: columnPosition },
      {
        where: {
          id: boardId
        },
        returning: true,
        plain: true,
      },
    );
      if(!updateBoard) {
        throw new Error('board not found')
      }
      const board = updateBoard[1].dataValues;
      res.status(200).json(board)
  } catch (error) {
    next(error);
  }
}