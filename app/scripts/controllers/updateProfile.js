'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:UpdateProfileCtrl
 * @description
 * # UpdateProfileCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('UpdateProfileCtrl', ['$scope', '$http', '$stateParams',
  	function ($scope, $http, $stateParams) {
    	$scope.user = $stateParams;
  	}]);