'use strict'; 

app.controller('userCtrl', function($scope, theUser){

	$scope.user = theUser; 

	$scope.orders = theUser.orders; 

})