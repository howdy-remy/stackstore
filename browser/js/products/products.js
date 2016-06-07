app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
        	allProducts: function($http) {
        		return $http.get('/api/products')
        		.then(function(response){
        			return response.data;
        		})
        	}
        }
    });

});

app.controller('ProductsCtrl', function ( $scope, allProducts) {

	$scope.products = allProducts;

});

// app.factory('ProductsFactory', function ($http) {

// 	var pf = {};

// 	pf.findAll = function(){

// 	}

// })