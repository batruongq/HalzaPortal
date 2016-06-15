'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:UpdateProfileCtrl
 * @description
 * # UpdateProfileCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
} ])
.controller('UpdateProfileCtrl', ['$scope', '$http', 'user', 'userService',
  	function ($scope, $http, user, userService) {

    	var userDatas = user.data;
      console.log(userDatas);

      $scope.userProfiles = {};
      $scope.userProfiles.photo = "http://192.168.190.92:3001" + userDatas.photo;
      $scope.userProfiles.fullName = userDatas.fullName
      $scope.userProfiles.phones = [];
      $scope.userProfiles.officeAddress = [];
      $scope.userProfiles.practiceAreas = [];
      $scope.userProfiles.medicalEducations = [];
      $scope.userProfiles.awards = [];

      if(userDatas.hospitalPhoneNumber != null){
        $scope.userProfiles.phones = userDatas.hospitalPhoneNumber.split(",");
      }
      if(userDatas.hospitalAddress != null){
        $scope.userProfiles.officeAddress = userDatas.hospitalAddress.split(",");
      }
      if(userDatas.medicinePracticeArea != null){
        $scope.userProfiles.practiceAreas = userDatas.medicinePracticeArea.split(",");
      }
      if(userDatas.medicalEducation != null){
        $scope.userProfiles.medicalEducations = userDatas.medicalEducation.split(",");
      }
      if(userDatas.award != null){
        $scope.userProfiles.awards = userDatas.award.split(",");
      }

    	$scope.isPhoneNumber = false;
    	$scope.isOfficeAddress = false;

    	$scope.showAddPhoneNumber = function(){
    		$scope.isPhoneNumber = true;
    	};

    	$scope.showAddOfficeAddress = function(){
    		$scope.isOfficeAddress = true;
    	};

      $scope.addNewOffice = function(office) {
        $scope.userProfiles.officeAddress.push(office);
        console.log($scope.userProfiles.officeAddress);
        $scope.newOffice = '';
      }

      $scope.addNewPhone = function(phone) {
        $scope.userProfiles.phones.push(phone);
        $scope.newPhone = '';
      }

      $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
          $scope.userProfiles.photo = value;
        });
        userService.updateProfile($scope.userProfiles);
      };

      

      // $scope.$watch('userProfiles', function(newValue, oldValue) {
      //   // Prevent
      //   if(newValue == oldValue) {
      //     return;
      //   }
      //   // Update tmp profile
      //   console.log('TODO: Call update tmp profile');
      //   userService.updateProfile($scope.userProfiles);
      // }, true);


  	}]);