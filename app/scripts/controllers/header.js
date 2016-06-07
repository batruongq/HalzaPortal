'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('HeaderCtrl', ['$scope', function ($scope) {

  	$scope.isLogged = false;
  	$scope.user = {};

  	$scope.$on('user:logged', function(event, user) {
  		$scope.user = user;
  		$scope.user.email = user.email;
  		$scope.user.accessTocken = "123";
  		
  		$scope.isLogged = true;
  	});
  }]);
