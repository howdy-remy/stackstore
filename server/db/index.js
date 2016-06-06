'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Order = require('./models/order')(db);
var Product = require('./models/product')(db);
var Review = require('./models/review')(db);

Order.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Product);