	'use strict';

var db = require('./_db');
var Sequelize = require('sequelize');

var User = require('./models/user');
var Order = require('./models/order');
var Product = require('./models/product');
var Review = require('./models/review');
var orderProducts = require('./models/orderProducts');
var Category = require('./models/category');

//ORDER+PRODUCT ASSOCIATIONS//
Order.belongsTo(User);

Order.belongsToMany(Product, {
	through: orderProducts
});

Product.belongsToMany(Order, {
	through: orderProducts
});

//PRODUCT+CATEGORY ASSOCIATIONS//
Product.belongsToMany(Category, {through: 'product_category'});
Category.belongsToMany(Product, {through: 'product_category'});


Review.belongsTo(User);
Review.belongsTo(Product);

module.exports = db;

