'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');
var orderProducts = require('./orderProducts');

module.exports = db.define('order', {

/*
------ NOTES -------
1. if a logged in user places an order, we should autofill their email 
2. logged in users may have past addresses stored somewhere? 
*/
	// items: {
	// 	type: Sequelize.ARRAY(Sequelize.JSON), 
	// 	allowNull: false		
	// },
	// //HOW CAN WE VALIDATE GIVEN ADDRESS IS VALID?
	street: {
		type: Sequelize.STRING,
		allowNull: false
	},
	city: {
		type: Sequelize.STRING, 
		allowNull: false		
	},
	state: {
		type: Sequelize.STRING, 
		allowNull: false,
		validate: {
			is: /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
		}
	},	
	zip: {
		type: Sequelize.INTEGER, 
		allowNull: false,		
		validate: {
			len: [5]
		}
	}, 
	status: {
        type: Sequelize.ENUM('created', 'processing', 'completed', 'cancelled'),
		defaultValue: 'created'
	}, 
	timePlaced: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW		
	},
	firstName: {
		type: Sequelize.STRING, 
		allowNull: false		
	}, 
	lastName: {
		type: Sequelize.STRING, 
		allowNull: false
	}
},
{
	instanceMethods: {
		getOrderTotal: function(){
			return orderProducts.findAll({where: {orderId: this.id}})
			.then(function(products){
				var total = products.reduce(function(prev, curr){
					return prev + (Number(curr.price) * Number(curr.amount));
				}, 0);
				console.log('HERE IS THE TOTAL', total);
				return total;
			});
		}
	}
}
);