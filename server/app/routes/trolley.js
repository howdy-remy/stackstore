'use strict';
var router = require('express').Router();
module.exports = router;

//getting all items in the trolley from the session
//check if persists after user login!!!!!!!
router.get('/', function(req, res, next){
	console.log('the trolley in the main get', req.session.trolley);
	res.send(req.session.trolley);
});

//adding an item to the trolley
router.post('/', function(req, res, next){
	req.body.amount = req.body.amount ? req.body.amount+1 : 1; //amount of product wanted (add only one to cart at start)
	if(!req.session.trolley){
		req.session.trolley = [];
	}
	req.session.trolley.push(req.body);
	res.sendStatus(201);
});

///to update quantity/amount in cart
router.put('/', function(req, res, next){ 
	let index = null;
	req.session.trolley.forEach(function(item, i){
		if(item.id === req.body.id){ index = i; }
	});
	if(index !== null) {
		req.session.trolley[index].amount = req.body.amount[req.body.id];
		res.sendStatus(204);
	} else {
		res.sendStatus(404); 
	}
});

///to delete an item from the cart
router.delete('/:id', function(req, res, next){ 
	req.session.trolley = req.session.trolley.filter(function(item){
		return item.id != req.params.id;
	});
	res.sendStatus(204);
});
