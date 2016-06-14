'use strict';
var router = require('express').Router();
var Product = require('../../db/models/product.js');
var Category = require('../../db/models/category.js');
module.exports = router;

//get all products
router.get('/', function(req,res,next){
	//if there is a query string, refine findAll by that obj, else don't refine by anything
	//also include category model with the result either way
	var whereObj = Object.keys(req.query).length ? { where: req.query, include: [{ model: Category }] } : { include: [{ model: Category }] };

	Product.findAll(whereObj)
		.then(function (products) {
			res.send(products);
		})
		.catch(next);

});

//add a new product
router.post('/', function(req, res, next){
	//only admins should be able to do this!
	console.log('im in the product post route');
	Product.create(req.body)
	.then(function(newProduct){
		res.status(201); //created
		res.send(newProduct);
	})
	.catch(next);
});
//fetch all categories
router.get('/categories', function(req, res, next){
	Category.findAll()
	.then(function(foundCategories){
		res.send(foundCategories);
	});
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
		console.log('this should be my product id ', req.params.id)
		console.log('this should be the updated req.body ', req.body);
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



