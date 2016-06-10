	'use strict';

var db = require('./_db');
var User = require('./models/user');
var Order = require('./models/order');
var Product = require('./models/product');
var Review = require('./models/review');
var orderProducts = require('./models/orderProducts');

Order.belongsTo(User);

Order.belongsToMany(Product, {
	through: orderProducts
});

Product.belongsToMany(Order, {
	through: orderProducts
});

Review.belongsTo(User);
Review.belongsTo(Product);

module.exports = db;

