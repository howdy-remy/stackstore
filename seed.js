/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Promise = require('sequelize').Promise;


var data = {
	user: [{
		email: 'testing@fsa.com',
		password: 'password'
	}, {
		email: 'obama@gmail.com',
		password: 'potus'
	}],
	product: [{
		title: 'Decoy Detonator',
		description: "Need to create a diversion to sneak past some Ministry employees? Then here's just the thing! You can twist the key at the top to set it up. Rolling action is friction activated. You just pull it back, release and off it goes.",
		price: 34.90,
		quantity: 10,
		category: ['diversion'],
		photoUrl: 'http://imgur.com/a/cWeLU'
	}, {
		title: 'Test Product',
		description: "Need to create a diversion to sneak past some Ministry employees? Then here's just the thing! You can twist the key at the top to set it up. Rolling action is friction activated. You just pull it back, release and off it goes.",
		price: 34.90,
		quantity: 10,
		category: ['diversion', 'office'],
		photoUrl: 'http://imgur.com/a/cWeLU'
	}]
};

db.sync({ force: true })
	.then(function () {
		return Promise.map(Object.keys(data), function (name) {
			return Promise.map(data[name], function (item) {
				return db.model(name)
					.create(item);
			});
		});
	})
	.then(function () {
		console.log(chalk.green('Seed successful!'));
		process.kill(0);
	})
	.catch(function (err) {
		console.error(err);
		console.log('hello!');
		process.kill(1);
	});
