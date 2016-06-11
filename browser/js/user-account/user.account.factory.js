'use strict'; 

app.factory('UserFactory', function($http, AuthService, $q){

	var UserFactory = {};

	var currentUser; 

	function getData (res) { return res.data; }

    function setUser () {
        AuthService.getLoggedInUser()
        .then(function (user) {
            currentUser = user;
        });
    };

	UserFactory.fetchById = function(id){
		var url = '/api/users/' + id;
		return $q.all([$http.get(url), $http.get(url + '/orders')])
		.then( function(responses) { return responses.map(getData); }) 
		.then( function (results) {
			var user = results[0];
			var orders = results[1]; 
			user.orders = orders; 
			return user;
		})
	};

	return UserFactory; 

})