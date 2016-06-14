'use strict';

app.controller('adminCtrl', function($scope, allOrders, allProducts, allUsers, AdminFactory) {

    $scope.orders = allOrders;
    $scope.products = allProducts;
    $scope.users = allUsers;

    $scope.sortType = 'id';
    $scope.sortReverse = false; 

    $scope.newStatus = { status: '' };
    $scope.searchOrders   = '';

    $scope.changeOrderStatus = function(order) {
    	var newStatus = $scope.newStatus;
    	AdminFactory.updateOrderStatus(order.id, newStatus);

    	$scope.orders = $scope.orders.map(function(elem){
    		if (elem.id === order.id) {
    			elem.status = $scope.newStatus.status;
    		}
			return elem; 
    	})
    }

    $scope.toggleAdminStatus = function(user) {
    	AdminFactory.updateAdminStatus(user.id, { isAdmin: !user.isAdmin} );

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
