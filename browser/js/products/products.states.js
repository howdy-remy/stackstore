'use strict';

app.config(function ($stateProvider) {

  $stateProvider.state('products', {
    url: '/products',
    templateUrl: 'js/products/products.html',
    controller: 'ProductsCtrl',
    resolve: {
    	allProducts: function(ProductFactory) {
    		return ProductFactory.fetchAll(); 
    	}, 
      allCategories: function(ProductFactory) {
          return ProductFactory.fetchCategories();
      }     
    }
  });

});