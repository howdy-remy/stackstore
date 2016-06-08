
app.controller('TrolleyCtrl', function($scope, TrolleyFactory, trolley){
	$scope.trolley = trolley;
	$scope.quantity = {};
	$scope.updateCart = function(item){
		return TrolleyFactory.updateCart(item, $scope.quantity);
	};

	$scope.removeFromCart = function(item){
		return TrolleyFactory.removeFromCart(item)
		.then(function(){
			$scope.trolley = $scope.trolley.filter(function(e){
				return e.id != item.id;
			});
		});
	};

	//EXAMPLE PRODUCT FOR TESTING ADD TO CART//
	$scope.product = {
			id: 1,
			title: 'Decoy Detonator',
			description: "Need to create a diversion to sneak past some Ministry employees? Then here's just the thing! You can twist the key at the top to set it up. Rolling action is friction activated. You just pull it back, release and off it goes.",
			price: 34.99,
			quantity: 10,
			category: ['general, defense'],
			photoUrl: 'http://i.imgur.com/1EoJoj2.jpg'
	};
});