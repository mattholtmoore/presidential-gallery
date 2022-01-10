const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class President extends Model {}

President.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    president_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    party_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    years_served: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    president_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    president_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'president',
  }
);

module.exports = President;
