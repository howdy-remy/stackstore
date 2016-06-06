'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');
// var User = require('./user.js');

module.exports = function (db) {
	db.define('order', {
		items : {
			type: Sequelize.ARRAY(Sequelize.JSON)
		}

	});

};