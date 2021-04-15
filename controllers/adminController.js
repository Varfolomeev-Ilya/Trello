require('dotenv').config();
const models = require('../db/models');
const { response } = require('express');
require('../middleware/loadingAvatar');

exports.getAllUsers = async (req, res, next) => {
  try {
    // const admin = await models.User.findOne({
    //   where: {
    //     roleId: req.query.roleId
    //   },
    // });

    // if (!admin) {
    //   throw new Error('user is not a admin');
    // };

    const allUsers = await models.User.findAll({
      order: [['id', 'ASC']],
    });
    return res.status(200).json({ message: 'All users', allUsers });
  } catch (err) {
    next(error);
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