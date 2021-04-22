
const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  db: {
    devUrl: process.env.DEV_DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  },
  passwordHash: {
    salt: process.env.PASSWORD_HASH_SALT,
  },
};

module.exports = config;
