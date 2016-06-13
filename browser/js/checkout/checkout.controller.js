app.controller('CheckoutCtrl', function($scope, CheckoutFactory){
	$scope.purchase = function(order){
		console.log($scope.checkout);
		return CheckoutFactory.purchase(order); 
	};
});