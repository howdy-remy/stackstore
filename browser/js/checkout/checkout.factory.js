app.factory('CheckoutFactory', function($http, $state){
	return {
		purchase: function(orderToBeAdded, user){
			if(user) orderToBeAdded.email = user.email;
			return $http.post('/api/orders/checkout', orderToBeAdded)
			.then(function(){
				// $http.post('/api/orders/email')  //send confirmation email to user 
				// .then(function(){
					$state.go('confirmation');  //send to confirmation page
				// });
			})
			.catch(console.error); 
		}
	};
});