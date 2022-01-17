'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category}) {
      this.belongsTo(Category, {foreignKey: 'category_id', as: 'category'});
    }
  };
  Product.init({
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    expirte_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};