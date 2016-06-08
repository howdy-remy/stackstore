'use strict';
var router = require('express').Router();
module.exports = router;


router.post('/', function(req, res, next){
	console.log('hit the post route')
	console.log('req.body', req.body);
	//need to test with a client********//
	if(!req.session.trolley){
		req.session.trolley = [];
	}
	req.session.trolley.push(req.body);
	res.redirect('/trolley');
});

router.get('/', function(req, res, next){
	res.send(req.session.trolley);
});

router.put('/', function(req, res, next){ ///to update quantity in cart
	

	// find the specific item in the session.trolley = use filter to find the 
	// item, update the quantity and then return updated array and set this equal to the 
	// session.trolly

});

// router.delete('/', function(req, res, next){ ///to delete an item from the cart
	//find the specific item in the session.trolley = use filter to find the 
	//item and then return an array without that item, set this equal to the 
	//session.trolly
// });