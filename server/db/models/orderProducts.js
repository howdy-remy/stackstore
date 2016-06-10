'use strict';
var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('orderProducts', {
	amount: {
		type: Sequelize.INTEGER, 
		allowNull: false
	}, 
	productPrice: {
		type: Sequelize.DECIMAL, 
		allowNull: false
	}
});
