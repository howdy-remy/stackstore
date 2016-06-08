'use strict';
var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('review', {
	text: {
		type: Sequelize.TEXT
	}, 
	stars: {
		type: Sequelize.INTEGER, 
		validate: {
			min: 1, 
			max: 5
		}
	}
});
