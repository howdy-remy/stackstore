'use strict';
var router = require('express').Router();
var Product = require('../../db/models/product.js');
module.exports = router;

//get all products
router.get('/', function(req,res,next){

//if there is a query string, refine findAll by that obj, else don't refine by anything
var whereObj = Object.keys(req.query).length ? req.query : {};

Product.findAll({where: whereObj})
	.then(function (products) {
		res.send(products); 
	})
	.catch(next);

});

//add a new product
router.post('/', function(req, res, next){
	//only admins should be able to do this!
	Product.create(req.body)
	.then(function(newProduct){
		res.status(201); //created
		res.send(newProduct);
	})
	.catch(next);
});

//get a single product
router.get('/:id', function(req,res,next){
	Product.findById(req.params.id)
	.then(function (foundProduct){
		if (!foundProduct) {
				var error = new Error();
				error.status = 404;
				throw error;
			}
			res.send(foundProduct);
	})
	.catch(next);

});

//edit a product
router.put('/:id', function(req, res, next){
	//only admins should be able do this!

		Product.findById(req.params.id)
		.then(function (foundProduct) {
			if (!foundProduct) {
				var error = new Error();
				error.status = 404;
				throw error;
			}
			return foundProduct.update(req.body);
		})
		.then(function (updatedProduct) {
			res.send(updatedProduct);
		})
		.catch(next);

});

//delete a product
router.delete('/:id', function(req, res, next){
	//only admins should be able to do this!

	Product.findById(req.params.id)
		.then(function (foundProduct) {
			if (!foundProduct) {
				var error = new Error();
				error.status = 404;
				throw error;
			}
			return foundProduct.destroy();
		})
		.then(function () {
			res.sendStatus(204);
		})
		.catch(next);
});

