app.directive('addToCart', function($http, TrolleyFactory){
	return {
		restrict: 'E',
		template: '<button>Add to Cart</button>',
		scope: {
			item: '='
		},
		link: function(scope, element){
			element.on('click', function(){
				console.log('element', element, 'scope', scope, 'item', scope.item);
				return TrolleyFactory.addToCart(scope.item);///need to pass in element to be added
				// return $http.post('/api/trolley', {title: 'something'});///need to update this later
			});
		}
	};
});