app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/orders/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });
});