'use strict';
var router = require('express').Router();
var Review = require('../../db/models/review.js');
var User = require('../../db/models/user.js');
module.exports = router;

//get all reviews
router.get('/', function(req, res, next){

	var whereObj = Object.keys(req.query).length ? req.query: {};	

	Review.findAll({where: whereObj})
	.then(function(reviews){
		res.send(reviews);
	})
	.catch(next);
});

//get a specific review
router.get('/:reviewId', function(req, res, next){
	Review.findById(req.params.reviewId)
	.then(function(review){
		res.send(review);
	})
	.catch(next);
});

//adding a new review
router.post('/', function(req, res, next){
	var user = req.user; 
	// var product = req.body.productId;
	Review.create(req.body)
	.then(function(newReview){
		return newReview.setUser(user);
	})
	.then(function(newReview){
		res.status(201).send(newReview);
	})
	.catch(next);
});


//edit a review (ONLY ADMIN)
router.put('/:id', function(req, res, next){

	Review.findById(req.params.id)
	.then(function (foundReview) {
		if (!foundReview) {
			var error = new Error();
			error.status = 404;
			throw error;
		}
		return foundReview.update(req.body);
	})
	.then(function (updatedReview) {
		res.send(updatedReview);
	})
	.catch(next);

});

//delete a review (ONLY ADMIN)
router.delete('/:id', function(req, res, next){

	Review.findById(req.params.id)
	.then(function (foundReview) {
		if (!foundReview) {
			var error = new Error();
			error.status = 404;
			throw error;
		}
		return foundReview.destroy();
	})
	.then(function () {
		res.sendStatus(204);
	})
	.catch(next);
});

