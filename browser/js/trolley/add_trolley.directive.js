app.directive('addToCart', function($http, TrolleyFactory){
	return {
		restrict: 'E',
		template: '<button>Add to Cart</button>',
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