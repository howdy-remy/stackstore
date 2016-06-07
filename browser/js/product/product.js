app.config(function ($stateProvider) {

    $stateProvider.state('product', {
        url: '/products/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl',
        resolve: {
        	theProduct: function($http, $stateParams) {
        		return $http.get('/api/products/' + $stateParams.id)
        		.then(function(response){
        			return response.data;
        		})
        	}
        }
    });

});

app.controller('ProductCtrl', function ($scope, theProduct ) {

	$scope.product = theProduct;

});

// app.factory()the