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
     res.json(allUsers);
  } catch (error) {
    next(error)
    return res.status(200).json({ message: 'All users', allUsers });
};
}
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
    const user = updatedUser[1].toJSON();
    delete user.password;
    return res.json(user);
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
    if (!deletedUser) {
      throw new Error('User not found');
    }
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};