'use strict';

app.controller('ReviewsCtrl', function($scope, allReviews){
	$scope.reviews = allReviews;
})