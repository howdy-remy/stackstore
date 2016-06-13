'use strict'; 

app.controller('adminCtrl', function($scope, allOrders, allProducts, allUsers, AdminFactory){

	$scope.orders = allOrders; 
	$scope.products = allProducts; 
	$scope.users = allUsers; 

	$scope.deleteUser = function(user, index) {
		var userId = user.id;
		$scope.users.splice(index, 1);
		AdminFactory.deleteUser(userId);
	};
})