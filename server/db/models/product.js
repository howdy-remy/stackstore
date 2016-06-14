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
	// category: {
	// 	type: Sequelize.ARRAY(Sequelize.STRING), //may be multiple categories
	// 	allowNull: false
	// },
	photoUrl: {
		type: Sequelize.STRING,
		defaultValue: "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=78144099"
	}
}
// ,{
// 	setterMethods: {
// 		updateQuantity: function(purchasedAmt){
// 			this.setDataValue('quantity', this.quantity - purchasedAmt);
// 		}
// 	}
// }
);
