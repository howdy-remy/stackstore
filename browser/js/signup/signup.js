app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'signupCtrl'
    });

});

app.controller('signupCtrl', function ($scope, AuthService, $state, signUpFactory) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function(signupInfo){
        return signUpFactory.sendSignup(signupInfo);
    };

});

app.factory('signUpFactory', function($http, $state, AuthService){
    return {
        sendSignup: function(signupInfo){
            return $http.post('/signup', signupInfo)
            .then(function(response){
                return AuthService.getLoggedInUser(false);
            })
            .then(function(){
                $state.go('products');
            })
            .catch(console.error);
        }
    };
});