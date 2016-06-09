'use strict';
var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('product', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	price: {
		type: Sequelize.DECIMAL, //need precision and zerofill?
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	category: {//can this be a model/relation instead? - th
		type: Sequelize.ARRAY(Sequelize.STRING), //may be multiple categories
		allowNull: false
	},
	photoUrl: {
		type: Sequelize.STRING
	}
});
