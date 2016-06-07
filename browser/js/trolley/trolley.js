
app.config(function ($stateProvider) {
    $stateProvider.state('trolley', {
        url: '/trolley',
        templateUrl: 'js/trolley/trolley.html',
        controller: 'TrolleyCtrl',
        resolve: {
        	trolley: function($http){
        		return $http.get('/api/trolley')
        		// .then(console.log);
        	}
        }
    });
});