'use strict';

app.controller('adminCtrl', function($scope, allOrders, allProducts, allUsers, AdminFactory) {

    $scope.orders = allOrders;
    $scope.products = allProducts;
    $scope.users = allUsers;

    $scope.toggleStatus = function(user) {
    	AdminFactory.updateStatus(user.id, { isAdmin: !user.isAdmin} );

    	$scope.users = $scope.users.map(function(elem){
    		if (elem.id === user.id) {
    			elem.isAdmin = !elem.isAdmin;
    		}
			return elem; 
    	})
    }

    $scope.deleteUser = function(user, index) {
        var userId = user.id;
        $scope.users.splice(index, 1);
        AdminFactory.deleteUser(userId);
    };
})
