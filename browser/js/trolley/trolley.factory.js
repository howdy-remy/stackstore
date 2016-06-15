app.factory('TrolleyFactory', function($http, $state){
	return {
		fetchAllItems: function(){
			return $http.get('/api/trolley')
			.then(res => res.data);
		}, 
		addToCart: function(itemToBeAdded){
			return $http.post('/api/trolley', itemToBeAdded)
			.then(function(){
				$state.go('trolley');
			});
		},
		updateCart: function(itemToBeUpdated, amount){
			return $http.put('/api/trolley', {id: itemToBeUpdated.id, amount: amount});
		}, 
		removeFromCart: function(itemToBeRemoved){
			console.log('in the factory', itemToBeRemoved)
			return $http.delete('/api/trolley/'+ itemToBeRemoved.id);
		},
		checkout: function(){
			console.log('inside the checkout function');
			$state.go('checkout');
		}
	};
});
