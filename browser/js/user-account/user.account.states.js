'use strict'; 

app.config(function($stateProvider){

	$stateProvider.state('userAccount', {
		url: '/account/:userId',
		templateUrl: 'js/user-account/templates/user-account.html',
		controller: 'userCtrl',
		resolve: {
			theUser: function(UserFactory, $stateParams){
				return UserFactory.fetchById($stateParams.userId);
			}, 			
			allOrders: function(AdminFactory){
				return AdminFactory.fetchOrders();
			},
			allProducts: function(AdminFactory){
				return AdminFactory.fetchProducts();
			},
			allUsers: function(AdminFactory){
				return AdminFactory.fetchUsers();
			},
			allCategories: function(ProductFactory){
				return ProductFactory.fetchCategories();
			}			
		}
	});

	$stateProvider.state('userAccount.info', {
		url: '/info',
		templateUrl: 'js/user-account/templates/user-account-info.html',
		controller: 'userCtrl'		
	}); 

	$stateProvider.state('userAccount.orders', {
		url: '/orders',
		templateUrl: 'js/user-account/templates/user-account-orders.html',
		controller: 'userCtrl'		
	});

	$stateProvider.state('userAccount.allorders', {
		url: '/allorders',
		templateUrl: 'js/user-account/templates/admin-account-allorders.html',
		controller: 'adminCtrl'		
	});

	$stateProvider.state('userAccount.allproducts', {
		url: '/allproducts',
		templateUrl: 'js/user-account/templates/admin-account-allproducts.html',
		controller: 'adminCtrl'		
	});
	
	$stateProvider.state('userAccount.allusers', {
		url: '/allusers',
		templateUrl: 'js/user-account/templates/admin-account-allusers.html',
		controller: 'adminCtrl'
	}); 
	$stateProvider.state('userAccount.newProduct', {
		url: '/newproduct',
		templateUrl: 'js/user-account/templates/admin-account-newproduct.html',
		controller: 'adminCtrl'
	});
	
});