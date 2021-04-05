require('dotenv').config();
const models = require('../db/models');
const bcrypt = require('bcryptjs');
const { updateTokens } = require('../middleware/updateToken');

exports.signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const oldUser = await models.User.findOne({ where: { email } });
    if (oldUser) {
      throw new Error('Email alredy used');
    };
    const passwordHash = bcrypt.hashSync(password, process.env.PASSWORD_HASH_SALT);
    const user = await models.User.create({
      email,
      firstName,
      lastName,
      roleId: 2,
      password: passwordHash,
    });
    const tokens = await updateTokens(user.id);

    return res.status(201).json({ message: 'New user created', user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  };
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Invalid email' });
    };

    const user = await models.User.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    };

    const iscorrect = await bcrypt.compare(password, user.password);
    if (!iscorrect) {
      return res.status(400).json({ message: 'incorrect password' });
    };

    const tokens = await updateTokens(user.id);

    return res.status(200).json({ message: 'successful login', tokens, user });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  };
};