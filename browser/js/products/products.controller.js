'use strict';

app.controller('ProductsCtrl', function ($scope, allProducts) {
	
	$scope.products = allProducts;

	$scope.categories = [{
			name: 'edibles',
			checked: false
		},
		{
			name: 'apparel',
			checked: false
		},
		{
			name: 'defense',
			checked: false
		},
		{
			name: 'wonderwitch',
			checked: false
		}];

	$scope.isFiltered = function(product){

		if (product.quantity === 0) return false;

		var allUnchecked = true;
		for (var i = 0; i < $scope.categories.length; i++) {
			if ($scope.categories[i].checked) allUnchecked = false;
		}

		if (allUnchecked) {
			return true;
		}

		for (var i = 0; i < $scope.categories.length; i++) {
			if ($scope.categories[i].checked && product.category.indexOf($scope.categories[i].name) >= 0) return true; 
		}

		return false;

	}


});
