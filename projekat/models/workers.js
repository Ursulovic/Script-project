'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Worker.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    work_time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Worker',
  });
  return Worker;
};