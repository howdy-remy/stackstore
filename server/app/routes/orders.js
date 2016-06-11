'use strict';
var router = require('express').Router();
var Order = require('../../db/models/order.js');
module.exports = router;

//get all orders
router.get('/', function(req,res,next){

//for query string requesting orders from a specific user
var whereObj = Object.keys(req.query).length ? req.query : {};
console.log('req.query here', req.query)

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

