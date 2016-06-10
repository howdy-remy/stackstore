
app.controller('TrolleyCtrl', function($scope, TrolleyFactory, trolley){
	$scope.trolley = trolley;
	$scope.amount = {};

	$scope.updateCart = function(item){
		return TrolleyFactory.updateCart(item, $scope.amount);
	};

	$scope.removeFromCart = function(item){
		return TrolleyFactory.removeFromCart(item)
		.then(function(){
			$scope.trolley = $scope.trolley.filter(function(e){
				return e.id != item.id;
			});
		});
	};
// **********added
	$scope.checkout = function(){
		return TrolleyFactory.checkout();
	};
});


app.controller('CheckoutCtrl', function($scope, CheckoutFactory){
	$scope.purchase = function(order){
		return CheckoutFactory.purchase(order);  //can we grab the items property from the session??
	};
	// $scope.trolley = trolley;
	// $scope.amount = {};

	// $scope.updateCart = function(item){
	// 	return TrolleyFactory.updateCart(item, $scope.amount);
	// };

	// $scope.removeFromCart = function(item){
	// 	return TrolleyFactory.removeFromCart(item)
	// 	.then(function(){
	// 		$scope.trolley = $scope.trolley.filter(function(e){
	// 			return e.id != item.id;
	// 		});
	// 	});
	// };
});