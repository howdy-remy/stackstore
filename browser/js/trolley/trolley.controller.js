
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

	console.log($scope.trolley)

	$scope.totalPrice = function(){
		var tot = 0;
		for (var i = 0; i < $scope.trolley.length; i++) {
			tot += (parseFloat($scope.trolley[i].amount) * parseFloat($scope.trolley[i].price));
		}
		return tot;
	}
});