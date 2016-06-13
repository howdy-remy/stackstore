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
var Product = require('./server/db/models/product.js');
var Category = require('./server/db/models/category.js');
var Order = require('./server/db/models/order.js');
var User = require('./server/db/models/user.js');
var Review = require('./server/db/models/review.js');
var Promise = require('sequelize').Promise;


var data = {
	user: [
		{email: 'testing@fsa.com',password: 'password'}, 
		{email: 'obama@gmail.com', password: 'potus'}
	],

	categories: [
		{ name: 'general' },
		{ name: 'defense' },
		{ name: 'edibles' },
		{ name: 'spy' },
		{ name: 'wonderwitch' },
		{ name: 'apparel' },
		{ name: 'muggle' }
	],

	products: [{
		product: { title: 'Decoy Detonator', description: "Need to create a diversion to sneak past some Ministry employees? Then here's just the thing! You can twist the key at the top to set it up. Rolling action is friction activated. You just pull it back, release and off it goes.", price: 34.99, quantity: 10, photoUrl: 'http://i.imgur.com/1EoJoj2.jpg' },
		categories: [{name: 'general'}, {name: 'defense'}],
	}, {
		product: { title: 'Puking Pastilles', description: "Help skive off classes with our Puking Pastilles! They make the eater vomit within seconds of eating it. Part of our Skiving Snackbox line.", price: 34.99, quantity: 10, photoUrl: 'http://i.imgur.com/WJMibuA.jpg' },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Fainting Fancies', description: "Need to skip a class? These large & round orange and lemon flavored gummies are just the thing you need! Part of our Skiving Snackbox line.", price: 7.99, quantity: 10, photoUrl: 'http://i.imgur.com/R1T0RTX.jpg' },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Fever Fudge', description: "Fever Fudge is designed to make the one who eats it get a high fever within seconds of eating it. Some side effects may occur. Part of our Skiving Snackbox line.", price: 7.99, quantity: 10, photoUrl: 'http://i.imgur.com/D9zauWb.jpg' },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Nosebleed Nougat', description: "The most popular of our Skiving Snackboxes! Make the eater's nose bleed heavily within seconds!", price: 7.99, quantity: 10, photoUrl: 'http://i.imgur.com/FkwdJmJ.jpg' },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Extendable Ears', description: "You'll be surprised at what you hear....with your Weasley Wizard Wheezes extendable ear!", price: 39.99, quantity: 10, photoUrl: 'http://i.imgur.com/RKwSiZh.jpg' },
		categories: [{name: 'spy'}]
	}, {
		product: { title: 'Cupid Crystals Love Potion', description: "Love Potion from our exclusive WonderWitch line!", price: 49.99, quantity: 10, photoUrl: 'http://i.imgur.com/zAoA1rg.jpg' },
		categories: [{name: 'edibles'}, {name: 'wonderwitch'}]
	}, {
		product: { title: 'Kissing Concoction Love Potion', description: "Love Potion from our exclusive WonderWitch line!", price: 49.99, quantity: 10, photoUrl: 'http://i.imgur.com/zAoA1rg.jpg' },
		categories: [{name: 'edibles'}, {name: 'wonderwitch'}]
	}, {
		product: { title: 'Beguiling Bubbles Love Potion', description: "Love Potion from our exclusive WonderWitch line!", price: 49.99, quantity: 10, photoUrl: 'http://i.imgur.com/zAoA1rg.jpg' },
		categories: [{name: 'edibles'}, {name: 'wonderwitch'}]
	}, {
		product: { title: 'Twilight Moonbeams Love Potion', description: "Love Potion from our exclusive WonderWitch line!", price: 49.99, quantity: 10, photoUrl: 'http://i.imgur.com/zAoA1rg.jpg' },
		categories: [{name: 'edibles'}, {name: 'wonderwitch'}]
	}, {
		product: { title: 'Ton-Tongue Toffee', description: "Grow your tongue four feet long! Or somebody elses...", price: 8.99, quantity: 10, photoUrl: 'http://i.imgur.com/FFZi2dx.jpg' },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Whoopie Cushion', description: "Muggle novelty!", price: 7.99, quantity: 10, photoUrl: 'http://i.imgur.com/Cqegul8.jpg' },
		categories: [{name: 'muggle'}]
	}, {
		product: { title: 'Deck of Cards', description: "Standard Muggle Deck of Cards. 52 Cards, 4 suits, hours of fun!", price: 14.99, quantity: 10, photoUrl: 'http://i.imgur.com/vpKozb1.jpg' },
		categories: [{name: 'muggle'}]
	}, {
		product: { title: 'Glasses Disguise', description: "Authentic Muggle glasses and moustache disguise.", price: 12.99, quantity: 10, photoUrl: 'http://i.imgur.com/sSsdTXe.jpg' },
		categories: [{name: 'muggle'}]
	}, {
		product: { title: 'Pygmy Puff', description: "Miniature puffskeins with pink or purle fur. Adorable!", price: 34.99, quantity: 10, photoUrl: 'http://i.imgur.com/sSsdTXe.jpg' },
		categories: [{name: 'wonderwitch'}]
	}, {
		product: { title: 'Peruvian Instant Darkness Powder', description: "Caught in a sticky situation and need a quick escape? This powder will fill a room with darkness allowing you to run to safety.", price: 49.99, quantity: 10, photoUrl: 'http://i.imgur.com/PY1EKYv.jpg' },
		categories: [{name: 'general'}, {name: 'defense'}]
	}, {
		product: { title: 'Shield Hats', description: "Hats with a built in shield-charm.", price: 19.99, quantity: 10, photoUrl: 'http://i.imgur.com/2TsxVpr.jpg' },
		categories: [{name: 'general'}, {name: 'defense'}, {name:'apparel'}]
	}, {
		product: { title: 'U No Poo', description: "WHY ARE YOU WORRYING ABOUT YOU-KNOW-WHO? YOU SHOULD BE WORRYING ABOUT U-NO-POO, THE CONSTIPATION SENSATION THAT'S GRIPPING THE NATION!", price: 9.99, quantity: 10, photoUrl: 'http://i.imgur.com/nwRGaeT.jpg' },
		categories: [{name: 'edibles'}]
	}]
};


db.sync({ force: true })
	//create users
	.then(function () {
		return Promise.map(data.user, function (user) {
			return User.create(user);
		});
	})
	//create categories
	.then(function () {
		return Promise.map(data.categories, function (category) {
			return Category.create(category);
		});
	})
	//create each product and make association
	.then(function () {
		return Promise.map(data.products, function (item) {
			return Product.create(item.product)
			.then(function(product){
				return Promise.map(item.categories, function(cat){
					return Category.findOne({where: {name: cat.name}})
					.then(function(foundCat){
						return product.addCategories([foundCat]);
					});
				});
			});
		});
	})
	.then(function (data) {
		console.log(chalk.green('Seed successful!'));
		process.exit(0);
	})
	.catch(function (err) {
		console.error(err);
		process.exit(1);
	});
