'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      this.hasMany(Product, {foreignKey: 'category_id', as: 'products', onDelete: 'cascade', onUpdate: 'cascade', hooks: 'true'});
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: DataTypes.TEXT,
    avg_weight: DataTypes.INTEGER,
    avg_price: DataTypes.INTEGER,
    tax: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};