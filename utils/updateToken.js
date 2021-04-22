const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: 'access',
  };
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN };
  return jwt.sign(payload, secret, options);
};

const updateTokens = async (userId) => {
  const accessToken = generateAccessToken(userId);
  try {
  } catch (err) {
    return res.status(404).json({ err: true, message: 'token has not been updated' });
  }
  return {
    accessToken,
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