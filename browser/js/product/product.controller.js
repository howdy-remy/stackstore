'use strict';

app.controller('ProductCtrl', function ($scope, $state, ProductFactory, theProduct) {

	$scope.product = theProduct;

	$scope.areEnough = function(){
		if ($scope.product.quantity === 0) return false; 
		else return true; 
	}

	$scope.addReview = function(){
		ProductFactory.createReview({text: $scope.newReview.text, stars: $scope.newReview.star, productId: theProduct.id})
		.then(function(){
			$state.go('product.reviews')
		})
		.catch(function(err){
			$scope.serverError = err.message || 'Something went wrong!';
		})
	}

});