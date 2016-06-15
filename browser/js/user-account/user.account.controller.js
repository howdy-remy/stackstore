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
    	return UserFactory.fetchOrderById(id)
    	.then(function(order){
    		order.products.forEach(function(el){
	    		$scope.orderProducts.push(el);
    		})
    	})
    	console.log('scopeorder', $scope.orderProducts)
    }

})

// name
// quantity
// price
// subtotal