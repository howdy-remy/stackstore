app.factory('CheckoutFactory', function ($http, $state) {
	return {
		purchase: function (order, user, code, result) {
			if (user) order.email = user.email;
			return $http.post('/api/orders/checkout', order)
				.then(function (order) {
					console.log('here is the order in the checkout factory!', order.data)
					if (result.error) {
						// window.alert('it failed! error: ' + result.error);
					} else {

						$http.post('/api/orders/chargecard', {stripe: result, order: order.data});
						// window.alert('success! token: ' + result.id);
					}
				})
				.then(function () {
					// $http.post('/api/orders/email')  //send confirmation email to user 
					// .then(function(){
					$state.go('confirmation'); //send to confirmation page
					// });
				})
				.catch(console.error);
		}
	};
});
