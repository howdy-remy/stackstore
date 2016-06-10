'use strict'; 

app.controller('userCtrl', function($scope, allOrders){

	console.log('ALL ORDERS', allOrders)
	$scope.orders = allOrders; 

})