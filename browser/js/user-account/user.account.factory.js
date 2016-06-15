'use strict';

app.factory('UserFactory', function ($http, AuthService, $q) {

	var UserFactory = {};


	function getData(res) {
		return res.data; }

	// var currentUser;
	
	// function setUser() {
	// 	AuthService.getLoggedInUser()
	// 		.then(function (user) {
	// 			currentUser = user;
	// 		});
	// };

	UserFactory.fetchById = function (id) {
		var url = '/api/users/' + id;
		return $q.all([$http.get(url), $http.get(url + '/orders')])
			.then(function (responses) {
				return responses.map(getData); })
			.then(function (results) {
				var user = results[0];
				var orders = results[1];
				user.orders = orders;
				return user;
			})
	};

	UserFactory.fetchOrderById = function(id) {
		return $http.get('api/orders/' + id)
		.then(getData)
		.then(function(order){
			return order; 
		})
	}

	return UserFactory;

})
