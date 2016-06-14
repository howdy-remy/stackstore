
app.controller('TrolleyCtrl', function($scope, TrolleyFactory, trolley){
	$scope.trolley = trolley;
	$scope.amount = {};

	// console.log($scope.trolley)

	var totalPrice = function(){
		var tot = 0;
		for (var i = 0; i < $scope.trolley.length; i++) {
		    tot += (parseFloat($scope.trolley[i].amount) * parseFloat($scope.trolley[i].price));
		}
		return tot;
	}

	$scope.tot = totalPrice();

	$scope.updateCart = function(item){

		var ind = $scope.trolley.indexOf(item);
		$scope.trolley[ind].amount = $scope.amount[item.id];
		$scope.tot = totalPrice();

		if ($scope.amount[item.id] === 0){
			$scope.removeFromCart(item);
		}
		else {
			 TrolleyFactory.updateCart(item, $scope.amount)
		}

	};

	$scope.removeFromCart = function(item){
		TrolleyFactory.removeFromCart(item)
		$scope.trolley = $scope.trolley.filter(function(e){
			return e.id !== item.id;
		});
		// console.log('new trolley', $scope.trolley)
	};
	$scope.checkout = function(){
		return TrolleyFactory.checkout();
	};



});


