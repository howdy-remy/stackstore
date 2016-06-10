app.factory('TrolleyFactory', function($http, $state){
	return {
		fetchAllItems: function(){
			return $http.get('/api/trolley')
			.then(res => res.data);
		}, 
		addToCart: function(itemToBeAdded){
			return $http.post('/api/trolley', itemToBeAdded)
			.then(function(addedItem){
				$state.go('trolley');
			});
		},
		updateCart: function(itemToBeUpdated, amount){
			return $http.put('/api/trolley', {id: itemToBeUpdated.id, amount: amount});
		}, 
		removeFromCart: function(itemToBeRemoved){
			return $http.delete('/api/trolley/'+ itemToBeRemoved.id);
		},
		//added---------------
		checkout: function(){
			console.log('inside the checkout function');
			$state.go('checkout');
		}
	};
});
// added--------------------
app.factory('CheckoutFactory', function($http){
	return {
		purchase: function(orderToBeAdded){
			console.log('In the purchase factory');
			console.log('shipping info ', req.session);
			console.log('order to be added', orderToBeAdded)
			//need to add order and shipping info into the database
			// return $http.post('/api/order', orderToBeAdded); ///need to create this route

		}
	};
});