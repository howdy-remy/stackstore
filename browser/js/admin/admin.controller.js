'use strict'; 

app.controller('adminCtrl', function($scope, allOrders, allProducts, allUsers, AdminFactory){

	$scope.orders = allOrders; 
	$scope.products = allProducts; 
	$scope.users = allUsers; 

	// $scope.deleteUser = AdminFactory.deleteUser();

})