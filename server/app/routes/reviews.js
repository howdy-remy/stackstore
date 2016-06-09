'use strict';
var router = require('express').Router();
var Review = require('../../db/models/review.js');
var Index = require('../../db/index.js');
module.exports = router;

//do we want to also get all reviews that a user has made? -th

//getting all reviews
router.get('/:productId', function(req, res, next){
	Review.findAll({where: {productId: req.params.productId}})
	.then(function(reviews){
		res.send(reviews);
	})
	.catch(next);
});

//getting a specific review
router.get('/:productId/:id', function (req, res, next){
	Review.findById(req.params.id)
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

