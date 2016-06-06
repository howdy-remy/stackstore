'use strict';

var expect = require('chai').expect;
var Order = require('../../../server/db/models/order');
var User = require('../../../server/db/models/user');
var db = require('../../../server/db/_db.js');

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
          include: { model: User }
        });
      })
      .then(function(order){
        expect(order.userId).to.exist;
        expect(order.userId.email).to.equal('harrypotter@hogwarts.com');
      });
  });

//how do we make the order belong to a guest session(authenticated vs unauthenticated?)

//is the below test sufficient? 
	it('contains line items, including price, current product ID and quantity', function(){
			return Order.create({
				items: [
          {productId: 1, price: 10.00, quantity: 2}, 
          {productId: 2, price: 20.00, quantity: 1}
        ]
			})
		.then(function(savedOrder){
			expect(Order.items).to.equal([
          {productId: 1, price: 10.00, quantity: 2}, 
          {productId: 2, price: 20.00, quantity: 1}
        ]);
		});
	});

}); //end of describe
