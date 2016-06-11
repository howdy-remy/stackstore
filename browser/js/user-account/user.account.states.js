'use strict'; 

app.config(function($stateProvider){

	$stateProvider.state('userAccount', {
		url: '/account/:userId',
		templateUrl: 'js/user-account/templates/user-account.html',
		controller: 'userCtrl',
		resolve: {
			theUser: function(UserFactory, $stateParams){
				return UserFactory.fetchById($stateParams.userId);
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