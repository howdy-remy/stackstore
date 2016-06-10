'use strict';
var router = require('express').Router();
module.exports = router;
var Orders = require('../../db/models/order.js');
var OrderProducts = require('../../db/models/orderProducts.js')


//adding an item to the trolley
router.post('/checkout', function(req, res, next){
	console.log('in the checkout route ', req.session.trolley);
	console.log('here is my req body', req.body);
	///**** fix the format of what is in the .create!!!!!****
	Orders.create({
		street: req.body.street,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName
		})  
	.then(function(createdOrder){
		console.log('this should be the order id of the order just created ', createdOrder.id);
		OrderProducts.bulkCreate({
			productId: createdOrder.id,
			amount: 10,
			price: 10
		})
		.then(function(createdOrderProducts){
///need to update the products model to update the quantity
		});
		items: req.session.trolley, ///need to update the items
		//what do we want to do after we create the order??  Send email to user??
		res.status(201);
		
	});
	//clear the trolley on the session
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
	.then(function(newOrder){
		res.status(201).send(newOrder);
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

