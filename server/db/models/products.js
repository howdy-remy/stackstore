'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {
	db.define('products', {
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT
		},
		price: {
			type: Sequelize.DECIMAL //need precision and zerofill?
		},
		quantity: {
			type: Sequelize.INTEGER
		},
		category: {
			type: Sequelize.ARRAY //may be multiple categories
		},
		photoUrl: {
			type: Sequelize.STRING 
		}
	});
};

