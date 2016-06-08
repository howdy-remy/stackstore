'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('product', {
        url: '/products/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl',
        resolve: {
          theProduct: function (ProductFactory, $stateParams) {
            return ProductFactory.fetchById($stateParams.id);
          }            
        }
    });

});