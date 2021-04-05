'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.belongsToMany(models.Board,
        { through: 'User_Boards' }
      );
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    dateOfBirth: DataTypes.DATE,
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 8,
      }
    },
    avatar: DataTypes.STRING,
    aboutMe: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    });
  return User;
};