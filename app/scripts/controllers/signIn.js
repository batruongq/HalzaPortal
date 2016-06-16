'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:SignInCtrl
 * @description
 * # SignInCtrl
 * Controller of the halzaPortalAppApp
 */
 angular.module('halzaPortalAppApp')
 .controller('SignInCtrl', ['$scope', '$http', '$state', 'GooglePlus','authentication', 'linkedInCallback',
   function ($scope, $http, $state, GooglePlus, authentication, linkedInCallback) {

       $scope.errMessage = "";
       $scope.isError = false;
       $scope.isLoading = false;
       $scope.user = {};

        //sign in by email
        $scope.loginByEmail = function () {
            $scope.isLoading = true;
            var sendData = $.param({
                username: $scope.user.username,
                password: $scope.user.password,
                remember: $scope.user.isRemember,
                grant_type: "password"
            });

            authentication.signIn(sendData, function () {
                $scope.isLoading = false;
                $state.go("home", {}, {reload: true});
            }, function (errorResponse) {
                $scope.isLoading = false;
                $scope.errMessage=  errorResponse.error_description;
                $scope.isError = true;
            });
        };

    	//sign in by google
    	$scope.loginByGoogle = function () {
            GooglePlus.login().then(function (authResult) {
                GooglePlus.getUser().then(function (user) {
                    var sendData = $.param({
                        provider: 'Google',
                        externalAccessToken: authResult.access_token,
                        userName: user.email,
                        userId: user.id
                    });
                    authentication.signInByGoogle(sendData, function() {
                        $state.go("home", {}, {reload: true});
                    }, function (response) {
                        $scope.errMessage=  response.modelState;
                        $scope.isError = true;
                    });
                });
            }, function (err) {
                console.log(err);
            });
        };
        
	   //sign in by linked in
     $scope.loginByLinkedIn = function(){
        var client_id = '75auoha37nqt11';
        var redirect_uri = 'http://localhost:3000/callback';
        window.location = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="
        + client_id + "&redirect_uri=" +  redirect_uri + "&state=987654321&scoper_emailaddress"; 
    };

}]);
