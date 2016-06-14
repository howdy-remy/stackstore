app.controller('CheckoutCtrl', function ($scope, CheckoutFactory, AuthService) {
	AuthService.getLoggedInUser()
		.then(function (user) {
			$scope.user = user;
		});

	$scope.purchase = function (order) {
		return CheckoutFactory.purchase(order, $scope.user);
	};
});
