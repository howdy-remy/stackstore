
app.controller('TrolleyCtrl', function($scope, TrolleyFactory, trolley){
	$scope.trolley = trolley;
	$scope.amount = {};

	console.log("THE TROLLEY ", $scope.trolley)

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
		.then(function(){
			$scope.trolley = $scope.trolley.filter(function(e){
				return e.id !== item.id;
			});
			$scope.tot = totalPrice();
			// console.log('new trolley', $scope.trolley)
		})
	};
	$scope.checkout = function(){
		return TrolleyFactory.checkout();
	};

	$scope.discountApplied = false;

	$scope.applyDiscount = function(code){
		if (code === "WAGEGAP" && !$scope.discountApplied) {
			$scope.promocode ="";
			$scope.discountApplied = true;
		}
	}




});


