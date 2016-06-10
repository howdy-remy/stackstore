
app.config(function ($stateProvider) {
    $stateProvider.state('trolley', {
        url: '/trolley',
        templateUrl: 'js/trolley/trolley.html',
        controller: 'TrolleyCtrl',
        resolve: {
        	trolley: function(TrolleyFactory){
                return TrolleyFactory.fetchAllItems();
        	}
        }
    });
});

//added -------------------------------------------
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/trolley/checkout.html',
        controller: 'CheckoutCtrl'
        // resolve: {
        //     trolley: function(TrolleyFactory){
        //         return TrolleyFactory.fetchAllItems();
        //     }
        // }
    });
});