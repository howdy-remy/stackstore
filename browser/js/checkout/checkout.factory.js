app.factory('CheckoutFactory', function($http, $state){
	return {
		purchase: function(orderToBeAdded){
			console.log('in beginning of the checkout post');
			return $http.post('/api/orders/checkout', orderToBeAdded)
			.then(function(data){
				// $http.post('/api/orders/email')  //send confirmation email to user 
				// .then(function(){
					$state.go('confirmation');  //send to confirmation page
				// });
			}); 
		}
	};
});