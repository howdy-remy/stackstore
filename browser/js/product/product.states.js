'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('product', {
        url: '/products/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl',
        resolve: {
            theProduct: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.id);
            }
        }
    });

    $stateProvider.state('product.reviews', {
        url: '/reviews',
        templateUrl: 'js/product/templates/product-allreviews.html',
        controller: 'ReviewsCtrl', 
        resolve: {
            allReviews: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchReviews($stateParams.id);
            }          
        }
    });

    $stateProvider.state('product.writeReview', {
        url: '/writeareview',
        templateUrl: 'js/product/templates/product-writereview.html',
        controller: 'ProductCtrl'
    });

});
