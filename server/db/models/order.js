'use strict';
var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('order', {
	items: {
		type: Sequelize.ARRAY(Sequelize.JSON)
	}
});
