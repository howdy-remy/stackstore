'use strict';

app.controller('ReviewsCtrl', function($scope, allReviews){
	$scope.reviews = allReviews;//seem to only be getting one review. -th
})
