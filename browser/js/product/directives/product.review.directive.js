app.directive('reviewList', function(){
	return {
		restrict: 'E', 
		templateUrl: 'js/product/directives/product.review.directive.html', 
		scope: {
			review: '=model'
		}
	}
})