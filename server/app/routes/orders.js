'use strict';
var router = require('express').Router();
module.exports = router;
var Orders = require('../../db/models/order.js');


//adding an item to the trolley
router.post('/checkout', function(req, res, next){
	console.log('in the checkout route ', req.session.trolley);
	console.log('here is my req body', req.body);
	///**** fix the format of what is in the .create!!!!!****
	Orders.create({
		items: req.session.trolley,
		street: req.body.street,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		status: 'placed',
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName
		})  
	.then(function(createdOrder){
		//what do we want to do after we create the order??  Send email to user??
		res.status(201);
		
	});
	//clear the trolley on the session
});