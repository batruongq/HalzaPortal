'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:UpdateProfileCtrl
 * @description
 * # UpdateProfileCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('UpdateProfileCtrl', ['$scope', '$http', '$stateParams', 'user',
  	function ($scope, $http, $stateParams, user) {
    	$scope.user = user;
    	$scope.isPhoneNumber = false;
    	$scope.isOfficeAddress = false;

    	$scope.showAddPhoneNumber = function(){
    		$scope.isPhoneNumber = true;
    	};

    	$scope.showAddOfficeAddress = function(){
    		$scope.isOfficeAddress = true;
    	};

      $scope.addNewOffice = function(office) {
        $scope.user.offices.push(office);
        $scope.newOffice = '';
      }

      $scope.addNewPhone = function(phone) {
        $scope.user.phones.push(phone);
        $scope.newPhone = '';
      }

      $scope.$watch('user', function(newValue, oldValue) {
        // Prevent
        if(newValue == oldValue) {
          return;
        }
        // Update tmp profile
        console.log('TODO: Call update tmp profile');
      }, true);

  	}]);