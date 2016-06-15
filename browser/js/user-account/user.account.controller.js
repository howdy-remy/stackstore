'use strict'; 

app.controller('userCtrl', function($scope, theUser, UserFactory){

	$scope.user = theUser; 

	$scope.orders = theUser.orders; 

	$scope.orderProducts = [];

	$scope.isAdmin = function(user) {
		if (user.isAdmin === true) {
			return true; 
		}
		return false; 
	};

	$scope.sortType = 'id';
    $scope.sortReverse = false; 

    $scope.getOrderDetails = function(id){
    	UserFactory.fetchOrderById(id)
    	.then(function(order){
    		$scope.orderProducts = [];
    		order.products.forEach(function(el){
	    		$scope.orderProducts.push(el.orderProducts);
    		})
    	})
    }

})