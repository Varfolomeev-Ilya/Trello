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
    const updatedUser = await models.User.update({
      firstName,
      lastName,
      aboutMe,
    },
      {
        where: { id },
        returning: true,
        plain: true
      });
    const user = updatedUser[1].dataValues;
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

exports.getAllUsers = async (req, res) => {
  try {
    // const { roleId } = req.body;
    // console.log(roleId)

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
    console.log(id)
    const oneUser = await models.User.findOne({
      where: { id },
    });
    return res.status(200).json({ message: 'User', oneUser });
  } catch (err) {
    res.status(404).json({ message: err.message });
  };
  next();
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


exports.uploadFile = async (req, res) => {
  try {
    const filedata = req.file;
    const id = req.body.id
    const updatedUser = await models.User.update(
      {
        avatar: filedata.path
      },
      {
        where: { id },
        returning: true,
        plain: true
      }
    )
    const user = updatedUser[1].dataValues;
    delete user.password;
    if (!filedata) {
      return res.status(400).json({ message: 'upload error, try again' });
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
};