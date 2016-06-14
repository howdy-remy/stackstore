'use strict'; 

app.controller('adminCtrl', function($scope, allOrders, allProducts, allUsers, AdminFactory, allCategories){

	$scope.orders = allOrders; 
	$scope.products = allProducts; 
	$scope.users = allUsers; 
	$scope.categories = allCategories;

	$scope.addProduct = function(newProduct){
		return AdminFactory.addProduct(newProduct);
	};

	$scope.productCategories = [];
	$scope.addCategory = function(newproduct){
		console.log('here is my new selected category', newproduct.category);
		$scope.productCategories.push(newproduct.category);
		console.log('all the categories ', $scope.productCategories);

	};
	// $scope.deleteUser = AdminFactory.deleteUser();

});