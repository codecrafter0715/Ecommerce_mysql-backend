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
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quality: {
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
    }
}, {
    tableName: 'Products',
    timestamps: true
});


// Associations with category and brand

Product.belongsTo(Brand,{
    foreignkey:'id',
    as:'Brands'
})

Product.belongsTo(Category, {
    foreignkey:'id',
    as:'Categories'

})


module.exports = Product;
