const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const models = require('../db/models');

const secret = process.env.JWT_SECRET;

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: 'access',
  };
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN };
  return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuidv4(),
    type: 'refresh',
  };
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN };
  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options),
  };
};

const updatedRefreshToken = async (tokenId, userId) => {
  try {
    let token;
    token = await models.token.findOne({ where: { userId } });
    if (!token) return await models.token.create({ userId, tokenId });
    return await token.update({ userId, tokenId });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  };
};

const updateTokens = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();
  try {
    await updatedRefreshToken(refreshToken.id, userId);
  } catch (err) {
    return res.status(404).json({ err: true, message: 'token has not been updated' });
  }
  return {
    accessToken,
    refreshToken: refreshToken.token,
  };
};

const tokenChecker = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
  req.user = payload.userId;
  next();
};

module.exports = { tokenChecker, updateTokens };