'use strict';

var expect = require('chai').expect;
var Order = require('...');///fill this in
var User = require('....')//fill this in
var db = require('....');//fill this in

describe('Orders', function(){
	before(function(){
		return db.sync({force: true});
	});

it('belongs to a user', function() {
    var user;
    return User.create({ email: 'harrypotter@hogwarts.com'})
      .then(function(u) {
        user = u;
        return Order.create({
          items: ['Blue Wizards', 'Green Wizards']
        });
      })
      .then(function(order) {
        return order.setUser(user);
      })
      .then(function() {
        return Order.findOne({ 
          where: { items: ['Blue Wizards', 'Green Wizards'] },
          include: { model: User}
        });
      })
      .then(function(order){
        expect(order.userId).to.exist;
        expect(order.userId.email).to.equal('harrypotter@hogwarts.com');
      });
  });









	it('has category than can accept more than one category stored in an array', function(){
		return Promise.all([
			Order.create({
				category: ['Toys']
			}),
			Order.create({
				category: ['Toys', 'Candy', 'Jokes']
			})
			])
		.spread(function(Order1, Order2){
			expect(Order1.category).to.equal(['Toys']);
			expect(Order2.category).to.equal(['Toys', 'Candy', 'Jokes']);
		});
	});
	it('has photoUrl of type url', function(){
		return Order.create({
			photoUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr05/enhanced-buzz-wide-28782-1403302157-11.jpg'
		}).then(function(savedOrder){
			expect(savedOrder.photoUrl).to.equal('https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/18/enhanced/webdr05/enhanced-buzz-wide-28782-1403302157-11.jpg');
		});
	});
	it('requires title, description, price, quantity, and category', function () {

    var Order = Order.build({});

    return Order.validate()
      .then(function(err) {
        expect(err).to.exist;
        expect(err.errors).to.contain.a.thing.with.property('title', 'description', 'price', 'quantity', 'category');
      });
  });
}); //end of describe
