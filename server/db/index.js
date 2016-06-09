'use strict';

var db = require('./_db');
var User = require('./models/user');
var Order = require('./models/order');
var Product = require('./models/product');
var Review = require('./models/review');

Order.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Product);

module.exports = db;

