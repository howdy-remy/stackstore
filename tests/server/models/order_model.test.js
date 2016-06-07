'use strict';

var expect = require('chai').expect;
var Promise = require('bluebird');
var db = require('../../../server/db/_db.js');
var Index = require('../../../server/db/index.js');

var Order = Index.Order; 
var User = Index.User; 

describe('Orders', function(){

  var order; 

  before(function(){
    return Order.create({
      items: [{productId: 1, price: 10.00, quantity: 2}, {productId: 2, price: 20.00, quantity: 1}],
      street: '42 Wallaby Way', 
      city: 'Sydney',
      state: 'TX', 
      zip: 55555,
      status: 'shipped', 
      email: 'psherman@findme.com', 
      firstName: 'Peter', 
      lastName: 'Sherman'
    })
    .then(function(createdOrder){
      order = createdOrder;
    })
  })

  afterEach(function () {
    return db.sync({force: true});
  });

it('belongs to a user', function() {
    var user;
    var orderId; 
    return User.create({ email: 'nemo@underthesea.com'})
    .then(function(user) {
      orderId = order.dataValues.id
      return order.setUser(user);
    })
    .then(function() {
      return Order.findOne({ 
        where: { id: orderId },
        include: { model: User }
      });
    })
    .then(function(order){
      expect(order.userId).to.exist;
      expect(order.user.email).to.equal('nemo@underthesea.com');
    })
  });

//how do we make the order belong to a guest session(authenticated vs unauthenticated?)

	it('contain line items, including price, current product ID and quantity', function(){
    expect(order.items[0].productId).to.equal(1);
    expect(order.items[1].productId).to.equal(2);
    expect(order.items[0].price).to.equal(10.00);
    expect(order.items[1].price).to.equal(20.00);
    expect(order.items[0].quantity).to.equal(2);
    expect(order.items[1].quantity).to.equal(1);
	});


  it('throws error when invalid email is provided', function(){
    var order = Order.build({
      items: [{productId: 1, price: 10.00, quantity: 2}, {productId: 2, price: 20.00, quantity: 1}],
      street: '42 Wallaby Way', 
      city: 'Sydney',
      state: 'TX', 
      zip: 55555,
      status: 'shipped', 
      email: 'psherman', 
      firstName: 'Peter', 
      lastName: 'Sherman'
    })

    return order.validate()
    .then(function(result){
      expect(result).to.be.an('object');
      expect(result.message).to.contain('Validation error: Validation isEmail failed');
    })    

  });

  it('throws error when invalid state is provided', function(){
    var order = Order.build({
      items: [{productId: 1, price: 10.00, quantity: 2}, {productId: 2, price: 20.00, quantity: 1}],
      street: '42 Wallaby Way', 
      city: 'Sydney',
      state: 'ZZ', 
      zip: 55555,
      status: 'shipped', 
      email: 'psherman@findme.com', 
      firstName: 'Peter', 
      lastName: 'Sherman'
    })

    return order.validate()
    .then(function(result){
      expect(result).to.be.an('object');
      expect(result.message).to.contain('Validation error: Validation is failed');
    })    

  });


}); //end of describe
