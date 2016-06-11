'use strict'; 

app.config(function($stateProvider){

	$stateProvider.state('adminAccount', {
		url: '/admin/:userId',
		templateUrl: 'js/user-account/templates/user-account.html',
		controller: 'adminCtrl',
		resolve: {
			allOrders: function(AdminFactory){
				return AdminFactory.fetchOrders();
			},
			allProducts: function(AdminFactory){
				return AdminFactory.fetchProducts();
			},
			allUsers: function(AdminFactory){
				return AdminFactory.fetchUsers();
			}
		}
	});

	$stateProvider.state('adminAccount.orders', {
		url: '/orders',
		templateUrl: 'js/admin-account/templates/admin-account-orders.html',
		controller: 'adminCtrl'		
	});

	$stateProvider.state('adminAccount.products', {
		url: '/products',
		templateUrl: 'js/admin-account/templates/admin-account-products.html',
		controller: 'adminCtrl'		
	});
	
	$stateProvider.state('adminAccount.users', {
		url: '/users',
		templateUrl: 'js/admin-account/templates/admin-account-users.html',
		controller: 'adminCtrl'		
	}); 

})