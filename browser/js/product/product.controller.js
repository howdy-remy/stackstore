'use strict';

app.controller('ProductCtrl', function ($scope, $state, ProductFactory, theProduct, AuthService) {

	$scope.product = theProduct;
	
	$scope.areEnough = function(){
		if ($scope.product.quantity === 0) return false; 
		else return true; 
	};

	$scope.addReview = function(){
		ProductFactory.createReview({text: $scope.newReview.text, stars: $scope.newReview.star, productId: theProduct.id})
		.then(function(){
			$state.go('product.reviews')
		})
		.catch(function(err){
			$scope.serverError = err.message || 'Something went wrong!';
		});
	};

	AuthService.getLoggedInUser()
	.then(function(user){
		if(!user) $scope.isAdmin=false;
		$scope.isAdmin = user.isAdmin;	
	});
	
	$scope.updatePic = function(){
		var updatedProductID = $scope.product.id;
		var imageURL = window.prompt("Please input your image url address");
		ProductFactory.updateProduct(updatedProductID, {photoUrl: imageURL});
		$scope.product.photoUrl = imageURL;
	};

	$scope.logChanges = function(){
		var updatedProductID = $scope.product.id;
		var updatedProduct = {};
		for(var prop in $scope.newProduct){
			if(Array.isArray($scope.newProduct[prop])){
				updatedProduct[prop] = $scope.newProduct[prop][0];
			}
		}
		console.log('here is my updated product', updatedProduct);
		ProductFactory.updateProduct(updatedProductID, updatedProduct);
	};
});

app.directive('contenteditable', function() {  ///NEED TO CLEAN THIS UP!!!!
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // view -> model
      elm.on('blur', function() {
      	console.log('in the on function');
        ctrl.$setViewValue(elm.html());
      });

      // model -> view
      // ctrl.$render = function() {
      //   elm.html(ctrl.$viewValue);
      // };

      // load init value from DOM
      ctrl.$setViewValue(elm.html());
    }
  };
});