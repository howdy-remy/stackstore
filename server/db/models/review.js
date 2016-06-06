'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {
	db.define('review', {
		text: {
			type: Sequelize.TEXT
		}
	});
};