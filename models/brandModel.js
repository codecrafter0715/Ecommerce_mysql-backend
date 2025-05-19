const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brand = sequelize.define('Brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Brands',
  timestamps: false  //at created updated table its is true ,otherwise false
});

module.exports = Brand;
