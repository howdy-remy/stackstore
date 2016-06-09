'use strict';
var router = require('express').Router();
var Review = require('../../db/models/review.js');
module.exports = router;

//getting all reviews
router.get('/', function(req, res, next){
	Review.findAll()
	.then(function(reviews){
		res.send(reviews);
	})
	.catch(next);
});

//adding a new review
router.post('/', function(req, res, next){
	Review.create(req.body)
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

