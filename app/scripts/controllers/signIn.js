'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:SignInCtrl
 * @description
 * # SignInCtrl
 * Controller of the halzaPortalAppApp
 */
 angular.module('halzaPortalAppApp')
 .controller('SignInCtrl', ['$scope', '$state', 'authentication', 
   function ($scope, $state, authentication) {

       $scope.errMessage = "";
       $scope.isError = false;
       $scope.isLoading = false;
       $scope.user = {username: "", password: "", remember: false};

        //sign in by email
        $scope.loginByEmail = function () {
            $scope.isLoading = true;
            
            authentication.signIn($scope.user, function () {
                $scope.isLoading = false;
                $state.go("home", {}, {reload: true});
            }, function (errorResponse) {
                $scope.isLoading = false;
                $scope.errMessage=  errorResponse.error_description;
                $scope.isError = true;
            });
        };
}]);
