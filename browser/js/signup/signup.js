app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'signupCtrl'
    });

});

app.controller('signupCtrl', function ($scope, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function(signupInfo){
        AuthService.signup(signupInfo)
        .then(function(){
            $state.go('products');
        })
        .catch(function () {
            $scope.error = 'R U U-KNOW-WHO? You did not provide valid signup credentials.';
        });
    };

});

// app.factory('signUpFactory', function($http, $state, AuthService){
//     return {
//         sendSignup: function(signupInfo){
//             return $http.post('/signup', signupInfo)
//             .then(function(response){
//                 return AuthService.getLoggedInUser(false);
//             })
//             .then(function(){
//                 $state.go('products');
//             })
//             .catch(console.error);
//         }
//     };
// });