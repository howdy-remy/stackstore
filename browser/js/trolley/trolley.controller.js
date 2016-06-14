
app.controller('TrolleyCtrl', function($scope, TrolleyFactory, trolley){
	$scope.trolley = trolley;
	$scope.amount = {};

	console.log($scope.trolley)

	var totalPrice = function(){
		var tot = 0;
		for (var i = 0; i < $scope.trolley.length; i++) {
		    tot += (parseFloat($scope.trolley[i].amount) * parseFloat($scope.trolley[i].price));
		}
		return tot;
	}

	$scope.tot = totalPrice();

	$scope.updateCart = function(item){

		if ($scope.amount[item.id] === 0){
			$scope.removeFromCart(item);
		}
		else {
			var ind = $scope.trolley.indexOf(item);
			$scope.trolley[ind].amount = $scope.amount[item.id];
			$scope.tot = totalPrice();
			 TrolleyFactory.updateCart(item, $scope.amount)
		}

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


