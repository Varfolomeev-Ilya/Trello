require('dotenv').config();
const models = require('../db/models');
require('../middleware/loadingAvatar');

exports.getAllUsers = async (req, res, next) => {
  try {
    const { roleId, id } = req.query;
    // if (req.query.roleId == 2) {
    //   const user = await models.User.findOne({
    //     where: {
    //       id: id,
    //     },
    //   });
    // }

    // if (!user) {
    //   throw new Error('user no found');
    // };

    const allUsers = await models.User.findAll({
      order: [['id', 'ASC']],
      // attributes: ['id', 'firstName', 'lastName', 'email'],
    });
    return res.status(200).json({ message: 'All users', allUsers });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  };
};

exports.updateOneUser = async (req, res, next) => {
  try {
    const { roleId, firstName, email, createdAt, id } = req.body;
    if (!roleId && !firstName && !email && !createdAt) {
      throw new Error('the data provided is incorrect ')
    };
    const updatedUser = await models.User.update(
      {
        roleId,
        firstName,
        email,
        createdAt
      },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );
    const user = updatedUser[1].dataValues;
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  };
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedUser = await models.User.destroy({
      where: { id },
    });
    const allusers = await models.User.findAll();
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return res.status(202).json(allusers);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  };
};