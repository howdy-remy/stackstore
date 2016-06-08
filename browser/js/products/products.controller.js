'use strict';

app.controller('ProductsCtrl', function ($scope, allProducts) {
	$scope.products = allProducts;
});
