require('dotenv').config();
const multer = require('multer');
const models = require('../db/models');
require('../middleware/loadingAvatar');

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, aboutMe, id } = req.body;
    if (!email && !firstName && !lastName && !aboutMe) {
      throw new Error('the data provided is incorrect ');
    };
    await models.User.update({
      firstName,
      lastName,
      aboutMe,
      avatar: multer.diskStorage.destination
    },
      {
        where: { id },
      });
    return res.status(201).json({ message: 'user updated' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  };
};

exports.getAllUsers = async (req, res) => {
  try {
    // const { roleId } = req.body;
    // if (roleId != 1) {
    //   throw new Error('user is not a admin');
    // };
    const allUsers = await models.User.findAll();
    return res.status(200).json({ message: 'All users', allUsers });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  };
};

exports.getOneUser = async (req, res) => {
  try {
    const id = req.body;
    const oneUser = await models.User.findOne({
      where: { id },
    });
    return res.status(200).json({ message: 'User', oneUser });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  };
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await models.User.destroy({
      where: { id },
    });
    return res.status(202).json({ message: 'User deleted', id });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  };
};
