app.controller('CheckoutCtrl', function ($scope, CheckoutFactory, AuthService) {
	AuthService.getLoggedInUser()
		.then(function (user) {
			$scope.user = user;
		});

	$scope.purchase = function (code, result) {
		return CheckoutFactory.purchase($scope.checkout, $scope.user, code, result);
	};
});
