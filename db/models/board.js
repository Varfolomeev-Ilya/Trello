'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Board.belongsToMany(models.User,
        { through: models.Mediator }
        );
      // Board.hasMany(models.Colums, {
      //   foreignKey: 'boardId',
      // })
    }
  };
  Board.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};