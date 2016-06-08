'use strict';
var router = require('express').Router();
module.exports = router;

//adding an item to the trolley
router.post('/', function(req, res, next){
	console.log('hit the post route')
	console.log('req.body', req.body);
	//need to test with a client********//
	if(!req.session.trolley){
		req.session.trolley = [];
	}
	req.session.trolley.push(req.body);
	console.log('here is our trolley after push', req.session.trolley, '-----------------------');
	res.sendStatus(201);
});

//getting all items in the trolley from the session
router.get('/', function(req, res, next){
	console.log('the trolley in the main get', req.session.trolley)
	res.send(req.session.trolley);
});

///to update quantity in cart
router.put('/', function(req, res, next){ 
	console.log('in the put route', req);//
	let index;
	req.session.trolley.forEach(function(item, i){
		if(item.id === req.body.id){
			index = i;
		}
	});
	if(index) {
		req.session.trolley[index].quantity = req.body.quantity;
		res.sendStatus(204);
	} else {
		res.sendStatus(404); 
	}
});

///to delete an item from the cart
router.delete('/:id', function(req, res, next){ 
	console.log('in here', req.params.id)
	req.session.trolley = req.session.trolley.filter(function(item){
		return item.id != req.params.id;
	});
	console.log('session after filter', req.session.trolley);
	res.sendStatus(204);
	// find the specific item in the session.trolley = use filter to find the 
	// item and then return an array without that item, set this equal to the 
	// session.trolly
});
