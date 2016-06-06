'use strict';

var expect = require('chai').expect;
var Product = require('../../../server/db/models/product');
var db = require('../../../server/db/_db.js');

describe('Products', function(){
	before(function(){
		return db.sync({force: true});
	});

	var text = 'Extendable Ears were created by Fred and George Weasley. They are long, flesh-coloured pieces of string which one can insert in ones ear, then shove the other end under (for example) a door, and one will hear the conversation or other noise as clear as if it was mere foot away, unless, that is, the door has been Imperturbed. The ears were invented sometime prior to Harry Potters arrival at 12 Grimmauld Place in 1995. Upon learning of their existence, Molly Weasley was outraged and binned as many of them as she could find. A number of the ears, however, survived this purge and remained in use.'

	it('has title of type string', function(){
		return Product.create({
			title: 'Extendable Ears'
		}).then(function(savedProduct){
			expect(savedProduct.title).to.equal('Extendable Ears');
		});
	});

	it('has description of type text', function(){
		return Product.create({
			title: 'Extendable Ears',
			description: text
		}).then(function(savedProduct){
			expect(savedProduct.description).to.equal(text);
		});
	});

	it('has price of type decimal', function(){
		return Product.create({
			price: 9.99
		}).then(function(savedProduct){
			expect(savedProduct.price).to.equal(9.99);
		});
	});

	it('has quantity of type integer', function(){
		return Product.create({
			quantity: 10
		}).then(function(savedProduct){
			expect(savedProduct.quantity).to.equal(10);
		});
	});

	it('has category than can accept more than one category stored in an array', function(){
		return Promise.all([
			Product.create({
				category: ['Toys']
			}),
			Product.create({
				category: ['Toys', 'Candy', 'Jokes']
			})
			])
		.spread(function(product1, product2){
			expect(product1.category).to.equal(['Toys']);
			expect(product2.category).to.equal(['Toys', 'Candy', 'Jokes']);
		});
	});

	it('has photoUrl of type url', function(){
		return Product.create({
			photoUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr05/enhanced-buzz-wide-28782-1403302157-11.jpg'
		}).then(function(savedProduct){
			expect(savedProduct.photoUrl).to.equal('https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr05/enhanced-buzz-wide-28782-1403302157-11.jpg');
		});
	});

	it('requires title, description, price, quantity, and category', function () {

    var product = Product.build({});

    return product.validate()
      .then(function(err) {
        expect(err).to.exist;
        expect(err.errors).to.contain.a.thing.with.property('title', 'description', 'price', 'quantity', 'category');
      });
  });

}); //end of describe
