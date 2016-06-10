'use strict'; 

app.config(function($stateProvider){

	$stateProvider.state('userAccount', {
		url: '/account',
		templateUrl: 'js/user-account/templates/user-account.html',
		controller: 'userCtrl',
		resolve: {
			allOrders: function(UserFactory){
				return UserFactory.fetchOrders();
			}
		}
	});

	$stateProvider.state('userAccount.info', {
		url: '/info',
		templateUrl: 'js/user-account/templates/user-account-info.html'
	}); 

	$stateProvider.state('userAccount.orders', {
		url: '/orders',
		templateUrl: 'js/user-account/templates/user-account-orders.html',
		controller: 'userCtrl'
	});
	
})