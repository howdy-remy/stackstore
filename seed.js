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
		{email: 'obama@gmail.com', password: 'potus'},
		{email: 'mallory@gmail.com', password:'1234', isAdmin: true},
		{email: 'belinda@gmail.com', password:'1234', isAdmin: true},
		{email: 'kimber@gmail.com', password:'1234', isAdmin: true},
		{email: 'rina@gmail.com', password:'1234', isAdmin: true}
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
		product: { title: 'Decoy Detonator', description: "Need to create a diversion to sneak past some Ministry employees? Then here's just the thing! You can twist the key at the top to set it up. Rolling action is friction activated. You just pull it back, release and off it goes.", price: 34.99, quantity: 10, photoUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr02/enhanced-buzz-wide-11895-1403302127-7.jpg' },
		categories: [{name: 'general'}, {name: 'defense'}],
	}, {
		product: { title: 'Chinese Fortune Sticks', description: "Kau Cim or Kau Chim is a fortune telling practice that originated in China in which the querent (person asking the question) requests answers from a sacred oracle lot. ", price: 7.99, quantity: 10, photoUrl: "http://d3b8erylo0uriu.cloudfront.net/wp-content/uploads/2014/07/Weasleys-Wizard-Wheezes-7.jpg" },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Fever Fudge', description: "Fever Fudge is designed to make the one who eats it get a high fever within seconds of eating it. Some side effects may occur. Part of our Skiving Snackbox line.", price: 7.99, quantity: 10, photoUrl: "https://c1.staticflickr.com/7/6142/5934639807_8fe4d96c58_b.jpg" },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Nosebleed Nougat', description: "The most popular of our Skiving Snackboxes! Make the eater's nose bleed heavily within seconds!", price: 7.99, quantity: 10, photoUrl: 'http://i.imgur.com/FkwdJmJ.jpg' },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Extendable Ears', description: "You'll be surprised at what you hear....with your Weasley Wizard Wheezes extendable ear!", price: 39.99, quantity: 10, photoUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr05/enhanced-buzz-wide-28782-1403302157-11.jpg" },
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
		product: { title: 'Nose Biting Tea Cup', description: "A Nose-Biting Teacup is presumably an ordinary-looking teacup that has been jinxed to bite the nose of anyone who tries to drink out of it.", price: 49.99, quantity: 10, photoUrl: "http://ecx.images-amazon.com/images/I/91dyjpyW3UL.jpg" },
		categories: [{name: 'edibles'}, {name: 'wonderwitch'}, {name: 'general'}]
	}, {
		product: { title: 'Ton-Tongue Toffee', description: "Grow your tongue four feet long! Or somebody elses...", price: 8.99, quantity: 10, photoUrl: "http://elbrooklyntaco.com/wp-content/uploads/2012/04/ton-tongue-toffee-honeydukes-orlando.jpg" },
		categories: [{name: 'edibles'}]
	}, {
		product: { title: 'Whoopie Cushion', description: "Muggle novelty!", price: 7.99, quantity: 10, photoUrl: 'http://www.wizardingworldharrypotter.com/wp-content/uploads/Weasleys23.JPG' },
		categories: [{name: 'muggle'}]
	}, {
		product: { title: 'Chocolate Cauldron', description: "Chocolate Cauldrons are boxed chocolates that are filled with Firewhiskey and presumably shaped like cauldrons", price: 14.99, quantity: 10, photoUrl: "http://www.havegeekwilltravel.com/wp-content/uploads/2015/02/DSC_8314-1024x678.jpg" },
		categories: [{name: 'muggle'}]
	}, {
		product: { title: 'Muggle Magic Juggling Balls', description: "Entertain the muggle way! Learn to juggle without magic using these muggle juggling balls", price: 12.99, quantity: 10, photoUrl: 'http://www.wizardingworldharrypotter.com/wp-content/uploads/Weasleys31.JPG' },
		categories: [{name: 'muggle'}]
	}, {
		product: { title: 'Sticky Trainers', description: "Sticky Trainers are yellow trainers with suction cups attached to the soles. The wearer can use them to climb walls and presumably to walk across ceilings as well.", price: 34.99, quantity: 10, photoUrl:"http://40.media.tumblr.com/98ea922e1302ad595be434824db2dcb4/tumblr_nlqprsb2nD1sxmfino3_1280.jpg" },
		categories: [{name: 'wonderwitch'}]
	}, {
		product: { title: 'Peruvian Instant Darkness Powder', description: "Caught in a sticky situation and need a quick escape? This powder will fill a room with darkness allowing you to run to safety.", price: 49.99, quantity: 10, photoUrl: 'http://www.wizardingworldharrypotter.com/wp-content/uploads/Weasleys29.JPG' },
		categories: [{name: 'general'}, {name: 'defense'}]
	}, {
		product: { title: 'Pepper Imps', description: "They are tiny black peppermint sweets that make your target smoke at the ears and nose", price: 19.99, quantity: 10, photoUrl: 'http://www.wizardingworldharrypotter.com/wp-content/uploads/Weasleys32.JPG' },
		categories: [{name: 'general'}, {name: 'edibles'}]
	}, {
		product: { title: 'U No Poo', description: "WHY ARE YOU WORRYING ABOUT YOU-KNOW-WHO? YOU SHOULD BE WORRYING ABOUT U-NO-POO, THE CONSTIPATION SENSATION THAT'S GRIPPING THE NATION!", price: 9.99, quantity: 10, photoUrl: "https://s-media-cache-ak0.pinimg.com/736x/96/95/23/9695236060e1576da77a8c31c9071b85.jpg" },
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
