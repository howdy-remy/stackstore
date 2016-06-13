'use strict';
var router = require('express').Router();
module.exports = router;
var Orders = require('../../db/models/order.js');
var Products = require('../../db/models/product.js');
var OrderProducts = require('../../db/models/orderProducts.js')
var Promise = require('bluebird');


router.post('/checkout', function(req, res, next){
	console.log('in the checkout route')
	Orders.create(req.body)  //1) create order in Orders model with shipping info
	.then(function(createdOrder){
		return Promise.map(req.session.trolley, function(item) { //2) update Products model to reduce the stock quantities by the number of items ordered
			return Products.findOne({where: {id: item.id}})
			.then(function(originalProduct){
				return Products.update({
						quantity: originalProduct.quantity - item.amount //can we access the quantity without doing a findOne first
						}, {where: {id: item.id}});
					})
					.then(function(){
						return Products.findOne({where: {id: item.id}});
					})
					.then(function(updatedProduct){  //3) update the price and amount fields in the OrderProducts model
						return createdOrder.addProduct(updatedProduct, { price: item.price, amount: item.amount });
					})
					.catch(function(err){
						console.log('there was an error ', err);
					});
		}) //end of promise.map
		.then(function(){
			req.session.trolley = [];  //4) clear the trolley on the session
			res.sendStatus(201);
		})
		.catch(function(err){
			console.log('there was an error ', err);
		});
	});
});

router.post('/email', function(req,res, next){ //to send comfirmation email to user
		//i think we need to npm install nodemailer and use this to send an email
		//we are clearing the trolley before this step, may need to clear it after email is sent

});

//get all orders
router.get('/', function(req,res,next){

//for query string requesting orders from a specific user
var whereObj = Object.keys(req.query).length ? req.query : {};

	Order.findAll({where: whereObj})
	.then(function (orders) {
		res.send(orders); 
	})
	.catch(next);

});

//add a new order
router.post('/', function(req, res, next){

	Order.create(req.body)
	.then(function(createdOrder){
		res.status(201).send(createdOrder);
	})
	.catch(next);

});

//get a single order
router.get('/:id', function(req,res,next){

	Order.findById(req.params.id)
	.then(function (foundOrder){
		if (!foundOrder) {
				var error = new Error();
				error.status = 404;
				throw error;
			}
			res.send(foundOrder);
	})
	.catch(next);

});

//update an order
	//only admins should be able do this!
router.put('/:id', function(req, res, next){

	Order.findById(req.params.id)
	.then(function (foundOrder) {
		if (!foundOrder) {
			var error = new Error();
			error.status = 404;
			throw error;
		}
		return foundOrder.update(req.body);
	})
	.then(function (updatedOrder) {
		res.send(updatedOrder);
	})
	.catch(next);

});

//delete an order
	//only admins should be able to do this!
router.delete('/:id', function(req, res, next){

	Order.findById(req.params.id)
		.then(function (foundOrder) {
			if (!foundOrder) {
				var error = new Error();
				error.status = 404;
				throw error;
			}
			return foundOrder.destroy();
		})
		.then(function () {
			res.sendStatus(204);
		})
		.catch(next);
});

