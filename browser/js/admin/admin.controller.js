'use strict'; 

app.controller('adminCtrl', function($scope, allOrders, allProducts, allUsers){

	$scope.orders = allOrders; 
	$scope.products = allProducts; 
	$scope.users = allUsers; 

	// $scope.deleteUser = AdminFactory.deleteUser();

})