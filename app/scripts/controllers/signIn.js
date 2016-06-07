'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:SignInCtrl
 * @description
 * # SignInCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('SignInCtrl', ['$scope', 'GooglePlus', '$http', '$location', '$cookies','$rootScope',
  	function ($scope, GooglePlus, $http, $location, $cookies, $rootScope) {

       $scope.user = {email: "", password: "", accessToken: ""};
       $scope.isRemember = false;
       var accCookie = $cookies.get('HalzaAccEmail');
       if(accCookie != undefined) {
            //auto login here
       }

        //sign in by email
        $scope.loginByEmail = function () {
            
            var data = $.param({
                json: JSON.stringify({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
            });

            //hard code user login success, send message to headerctr to handle header UI
            var user = {
                email: 'thiba.t208@gmail.com'
            };
            $rootScope.$broadcast('user:logged', user);
            $location.path("/home");

            $http.post("", data).success(function(data, status) {
                if($scope.isRemember){
                //$cookies.put('HalzaAccEmail', $scope.user.email);
                //$cookies.put('HalzaAccAccessToken', data.accessToken);
            }
                $location.path("/home");
            })
    };

    	//sign in by google
    	$scope.loginByGoogle = function () {
        GooglePlus.login().then(function (authResult) {
            console.log(authResult);

            GooglePlus.getUser().then(function (user) {
                console.log(user);
                $location.path("/home");
            });
        }, function (err) {
            console.log(err);
        });
    };

	//sign in by linked in
    $scope.linkedinMsg = {};
    $scope.showLinkedinLogin = true;
    $scope.showEmailForm = true;
    
    $scope.linkedinProfileDataCallback = function(data){
        console.log('profileDataCallback',data);
        $location.path("/home");
    };

  }]);