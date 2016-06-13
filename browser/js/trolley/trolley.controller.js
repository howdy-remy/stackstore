
app.controller('TrolleyCtrl', function($scope, TrolleyFactory, trolley){
	$scope.trolley = trolley;//remains trolley on logout-th
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
});
