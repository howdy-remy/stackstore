app.directive('addToCart', function($http){
	return {
		restrict: 'E',
		template: '<button>Add to Cart</button>',
		link: function(scope, element){
			element.on('click', function(){
				return $http.post('/api/trolley', {title: 'something'});///need to update this later
			});
		}
	};
});