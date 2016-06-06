'use strict';
var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('product', {
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
		type: Sequelize.ARRAY(Sequelize.STRING) //may be multiple categories
	},
	photoUrl: {
		type: Sequelize.STRING
	}
});
