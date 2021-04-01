'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Colums.hasMany(models.Board,{
        foreignKey: 'boardId',
        as: 'BoardColum'
      })
      // Colums.hasMany(models.Task, {
      //   foreignKey: 'columnId',
      //   onDelete: 'CASCADE',
      // });
    }
  };
  Colums.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Colums',
  });
  return Colums;
};