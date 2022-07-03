const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Product_Tag",
  }
);

module.exports = ProductTag;
