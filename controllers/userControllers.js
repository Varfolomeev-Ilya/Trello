require("dotenv").config();
const multer = require("multer");
const models = require('../db/models');
require("../middleware/loadingAvatar");

exports.putUser = async (req, res) => {
  try {
    const { firstName, lastName, email, aboutMe, id, token } = req.body;
    if (!email && !firstName && !lastName && !aboutMe) {
      throw new Error("the data provided is incorrect ");
    };
    await models.User.update({
      firstName: firstName,
      lastName: lastName,
      aboutMe: aboutMe,
      // dateOfBirth: dateOfBirth
      // avatar: multer.diskStorage.destination
    },
      {
        where: {
          id:JSON.parse(id)
        },
      });
    res.status(200).json({ message: "user updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  };
};

exports.getAllUsers = async (req, res) => {
  try {
    // const { roleId } = req.body;
    // if (roleId != 1) {
    //   throw new Error("user is not a admin");
    // };
    const allUsers = await models.User.findAll({
      attributes: { exclude: ["password"] }
    });
    res.status(200).json({ message: "All users", allUsers });
  } catch (err) {
    res.status(401).json({ message: err.message });
  };
};

exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const oneUser = await models.User.findOne({
      where: { id },
      attributes: { exclude: ["password"] }
    });
    res.status(200).json({ message: "User", oneUser });
  } catch (err) {
    res.status(401).json({ message: err.message });
  };
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await models.User.destroy({
      where: {
        id
      },
    });
    res.status(200).json({ message: "User deleted", id });
  } catch (err) {
    res.status(401).json({ message: err.message });
  };
};
