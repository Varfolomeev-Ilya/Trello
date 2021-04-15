'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Column.belongsTo(models.Board, {
        foreignKey: 'boardId',
      })
      Column.hasMany(models.Task, {
        foreignKey: 'columnId',
        onDelete: 'cascade',
      });
    }
  };
  Column.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Column',
  });
  return Column;
};