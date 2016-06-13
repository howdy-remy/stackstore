
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
				return e.id !== item.id;
			});
		});
	};
	$scope.checkout = function(){
		return TrolleyFactory.checkout();
	};
});


