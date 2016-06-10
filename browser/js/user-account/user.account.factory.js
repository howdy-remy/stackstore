'use strict'; 

app.factory('UserFactory', function($http, AuthService){

	var UserFactory = {};

	var currentUser; 

	function getData (res) { return res.data; }

    function setUser () {
        AuthService.getLoggedInUser()
        .then(function (user) {
            currentUser = user;
            console.log('USER IN CURRENT USER', currentUser)
        });
    };

	UserFactory.fetchOrders = function(){
		setUser();
		return $http.get('/api/orders?userId=' + currentUser.id)
		.then(getData)
		.then(function(orders){
			console.log('successfully got orders')
			return orders;
		})
	};

	return UserFactory; 

})