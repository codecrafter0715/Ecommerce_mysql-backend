const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/db');  
const Brand = require('./brandModel')
const Category = require('./categoryModel')


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(100),
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false  
    },
    Instock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    image:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
    tableName: 'Products',
    timestamps: true
});


// Associations with category and brand

Product.belongsTo(Brand,{
    foreignKey:'brand_id',   
    as:'Brands'
})

Product.belongsTo(Category, {
    foreignKey:'category_id', 
    as:'Categories'
})



module.exports = Product;
