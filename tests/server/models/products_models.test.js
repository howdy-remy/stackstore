'use strict';

var expect = require('chai').expect;
var Product = require('...');///fill this in
var db = require('....');//fill this in

describe('Products', function(){
	before(function(){
		return db.sync({force: true});
	});

	it('has title, description of type string', function(){
		return Product.create({
			title: 'Extendable Ears',
			description: 'Listen in on any converstaion'
		}).then(function(savedProduct){
			expect(savedProduct.title).to.equal('Extendable Ears');
			expect(savedProduct.description).to.equal('Listen in on any converstaion');
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
