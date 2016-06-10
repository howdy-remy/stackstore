app.factory('CheckoutFactory', function($http){
	return {
		purchase: function(orderToBeAdded){
			console.log('In the purchase factory');
			console.log('order to be added', orderToBeAdded)
			//need to add order and shipping info into the database
			return $http.post('/api/orders/checkout', orderToBeAdded); 
		}
	};
});