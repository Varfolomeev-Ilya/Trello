require("dotenv").config();
const models = require('../db/models');
const bcrypt = require('bcryptjs');
const { updateTokens } = require("../middleware/updateToken");

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await models.User.findOne({ where: { email: email } });
      if (oldUser) {
        throw new Error("Email alredy used");
      };
    const passwordHash = bcrypt.hashSync(password, 10);
    await models.User.create({
      email: email,
      password: passwordHash,
    });

    res.status(200).json({ message: "New user created" });  
  } catch (err) {
      res.status(400).json({ message: err.message });  
  };
};  

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "Invalid email"});
    };

    const user = await models.User.findOne({ where : { email: email } });
    if (!user) {
      res.status(400).json({ message: "user not found" });
    };

    const iscorrect = await bcrypt.compare(password, user.password);
    if (!iscorrect) {
      res.status(400).json({ message: "incorrect password" });
    };

    const tokens = await updateTokens(user.id);
    
      res.status(200).json({ message : "successful login", tokens});
        
  } catch (err) {
      res.status(400).json({ message: err.message});
  };
};