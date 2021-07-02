const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

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
      references: product(id)
    },
    tag_id: {
      type: DataTypes.INTEGER,
      // may need foreign key here
      // References the tag model's id *** need to confirm is correct
      references: tag(id)
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