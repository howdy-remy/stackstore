'use strict';

var expect = require('chai').expect;

var Product = require('../../../server/db/models/product');
var Promise = require('bluebird');
var db = require('../../../server/db/_db.js');

describe('Product', function(){

	var text = 'Extendable Ears were created by Fred and George Weasley. They are long, flesh-coloured pieces of string which one can insert in ones ear, then shove the other end under (for example) a door, and one will hear the conversation or other noise as clear as if it was mere foot away, unless, that is, the door has been Imperturbed. The ears were invented sometime prior to Harry Potters arrival at 12 Grimmauld Place in 1995. Upon learning of their existence, Molly Weasley was outraged and binned as many of them as she could find. A number of the ears, however, survived this purge and remained in use.'; 
	var product; 

	before(function(){
    return Product.create({
      title: 'Extendable Ears',
      description: text, 
      price: 9.99,
      quantity: 10, 
      category: ['Toys', 'Stretchy', 'Jokes'],
      photoUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr05/enhanced-buzz-wide-28782-1403302157-11.jpg'
    })
	 	.then(function(createdProduct){
			product = createdProduct;
		})
	})

	afterEach(function () {
    return db.sync({force: true});
  });

	it('has title of type string', function(){
		expect(product.title).to.equal('Extendable Ears');
	});

	it('has description of type text', function(){
		expect(product.description).to.equal(text);
	});

	it('has price of type decimal', function(){
		expect(product.price).to.equal('9.99');
	});

	it('has quantity of type integer', function(){
		expect(product.quantity).to.equal(10);
	});

	it('has category than can accept more than one category stored in an array', function(){
		expect(product.category).to.contain('Toys', 'Stretchy', 'Jokes');
		expect(product.category.length).to.equal(3);
	});

	it('has photoUrl of type url', function(){
		expect(product.photoUrl).to.equal('https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr05/enhanced-buzz-wide-28782-1403302157-11.jpg');
	});

}); //end of describe1

describe('Product requirements', function(){

	afterEach(function () {
    return db.sync({force: true});
  });

	it('requires title', function () {
	    var product = Product.build({});
    	return product.validate()
    	.then(function(result) {
	        expect(result).to.be.an('object');
	        expect(result.message).to.contain('notNull Violation: title cannot be null');
      });
  	});

	it('requires description', function () {
	    var product1 = Product.build({
	     	title: 'Product1', 
	    	price: 5.00,
	    	quantity: 1, 
	    	category: ['Toy']
	    })

	    return product1.validate()
	      .then(function(result) {
	        expect(result).to.be.an('object');
	        expect(result.message).to.contain('notNull Violation: description cannot be null');
	      });
 	});

	it('requires price', function () {
	    var product = Product.build({
	    	title: 'Product1', 
	    	description: 'Here is an absolutely riveting description',
	    	quantity: 1, 
	    	category: ['Toy']	    	
	    });

	    return product.validate()
	      .then(function(result) {
	        expect(result).to.be.an('object');
	        expect(result.message).to.contain('notNull Violation: price cannot be null');
	      });
  	});

	it('requires quantity', function () {
	    var product = Product.build({
	    	title: 'Product1', 
	    	price: 5.00,
	    	description: 'Here is an absolutely riveting description', 
	    	category: ['Toy']	    	
	    });

	    return product.validate()
	      .then(function(result) {
	        expect(result).to.be.an('object');
	        expect(result.message).to.contain('notNull Violation: quantity cannot be null');
	      });
  	});

	it('requires category', function () {
	    var product = Product.build({
	    	title: 'Product1', 
	    	price: 5.00,
	    	quantity: 1,
	    	description: 'Here is an absolutely riveting description'
	    });

	    return product.validate()
	      .then(function(result) {
	        expect(result).to.be.an('object');
	        expect(result.message).to.contain('notNull Violation: category cannot be null');
	      });
  });

});


