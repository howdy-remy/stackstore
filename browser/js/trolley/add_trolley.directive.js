app.directive('addToCart', function($http, TrolleyFactory){
	return {
		restrict: 'E',
		template: '<button class="trolley-button">Add to Trolley</button>',
		scope: {
			item: '='
		},
		link: function(scope, element){
			element.on('click', function(){
				return TrolleyFactory.addToCart(scope.item);
			});
		}
	};
});