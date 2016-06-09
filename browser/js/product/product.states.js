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

    $stateProvider.state('product.reviews', {
        url: '/products/:id/reviews',
        templateUrl: 'js/product/templates/product-allreviews.html',
        controller: 'ProductCtrl'
    });

    $stateProvider.state('product.writeReview', {
        url: '/products/:id/writeareview',
        templateUrl: 'js/product/templates/product-writereview.html',
        controller: 'ProductCtrl'
    });

});