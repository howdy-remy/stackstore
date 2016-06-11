'use strict'; 

app.factory('AdminFactory', function($http, AuthService, $q){

	var AdminFactory = {};

	function getData (res) { return res.data; }

	AdminFactory.fetchOrders = function(){
		return $http.get('/api/orders')
		.then(getData) 
		.then(function (orders) {
			return orders;
		})
	};

	AdminFactory.fetchProducts = function(){
		return $http.get('/api/products')
		.then(getData) 
		.then(function (products) {
			return products;
		})
	};

	AdminFactory.fetchUsers = function(){
		return $http.get('/api/users')
		.then(getData) 
		.then(function (users) {
			return users;
		})
	};

	return AdminFactory; 

})