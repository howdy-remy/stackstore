'use strict'; 

app.controller('userCtrl', function($scope, theUser){

	$scope.user = theUser; 

	$scope.orders = theUser.orders; 

	$scope.isAdmin = function(user) {
		if (user.isAdmin === true) {
			return true; 
		}
		return false; 
	};

})