const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Product = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model {}

ProductTag.init(
  {
    // DEFINED COLUMNS
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      // may need foreign key here
      // References the produt model's id *** need to confirm is correct
      references: {
        model: Product,
        key: "id"
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      // may need foreign key here
      // References the tag model's id *** need to confirm is correct
      references: {
        model: Tag,
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;