require('dotenv').config();
const models = require('../db/models');

exports.createBoard = async (req, res) => {
  try {
    const { name, email, id } = req.body;
    // const oldBoard = await models.Boards.findOne({ where: {name: name}} );
    // if (oldBoard) {
    //   throw new Error('Board name not available')
    // };

    await models.User.findOne({
      where: { email },
    });

    const board = await models.Board.create({
      name: name,
      userId: id
    });

    res.status(200).json({ message: 'New board created', board });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};