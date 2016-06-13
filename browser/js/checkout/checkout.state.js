app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/orders/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('confirmation', {
        url: '/orders/confirmation',
        templateUrl: 'js/checkout/confirmation.html'
    });
});