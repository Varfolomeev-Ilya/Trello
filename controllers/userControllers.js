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
    return res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.user },
    });
    return res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  };
  next();
};

exports.uploadFile = async (req, res) => {
  try {
    const filedata = req.file;
    const id = req.body.id
    const imgUrl = req.body.imgUrl;
    const updatedUser = await models.User.update(
      {
        avatar: imgUrl
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
    return res.json(user)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
};

