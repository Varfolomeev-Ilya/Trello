require("dotenv").config();
const models = require('../db/models');
const bcrypt = require('bcryptjs');
const { updateTokens } = require("../middleware/updateToken");

exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password, birthday } = req.body;
    const oldUser = await models.User.findOne({ where: { email: email } });
      if (oldUser) {
        throw new Error("Email alredy used");
      };
    const passwordHash = bcrypt.hashSync(password, 10);
    await models.User.create({
      fullName: fullName,
      email: email,
      password: passwordHash,
      birthday: birthday,
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

exports.putUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { fullName, email, password, birthday } = req.body;
      if (!fullName && !email && !password && !birthday) {
        throw new Error("the data provided is incorrect ");
      };
    await models.User.update({
      fullName: fullName,
      birthday: birthday,
    },
    { where: { 
      id: id 
      },
    });
    res.status(200).json({ message: "user updated", id}); 
  } catch (err) {
      res.status(400).json({ message: err.message});
  };
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await models.User.findAll({
      raw:true, 
      attributes: { exclude: ["password"]}
    });
    res.status(200).json({ message: "All users", allUsers });
    } catch (err) {
        res.status(401).json({ message: err.message });
    };
};

exports.getOneUser = async (req, res) => {
  try{
    const id = req.params.id;
    const oneUser = await models.User.findOne({
      where: { id },
      attributes: { exclude: ["password"]}
    });
    res.status(200).json({ message: "User", oneUser});
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
      res.status(200).json({ message: "User deleted", id});
  } catch (err) {
      res.status(401).json({ message: err.message});
  };
};
