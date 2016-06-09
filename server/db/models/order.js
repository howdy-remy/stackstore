'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');
var User = require('./user');

module.exports = db.define('order', {

/*
------ NOTES -------
1. if a logged in user places an order, we should autofill their email
2. logged in users may have past addresses stored somewhere?
*/
	items: {//could we do a relation instead? -th
		type: Sequelize.ARRAY(Sequelize.JSON),
		allowNull: false
	},
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
        type: Sequelize.ENUM('placed', 'shipped', 'delivered'),
		defaultValue: 'placed'
	},
	timePlaced: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	}
});
