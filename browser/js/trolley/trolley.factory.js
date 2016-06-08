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
		updateCart: function(itemToBeUpdated, quantity){
			return $http.put('/api/trolley', {id: itemToBeUpdated.id, quantity: quantity});
		}, 
		removeFromCart: function(itemToBeRemoved){
			return $http.delete('/api/trolley/'+ itemToBeRemoved.id);
		}
	};
});