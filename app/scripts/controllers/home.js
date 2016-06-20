'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('HomeCtrl', ['$scope', '$uibModal', 'user', function ($scope, $uibModal, user) {
  	$scope.user = user.data;

  	$scope.openAddPatientPopup = function(){
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/views/addPatient.html',
      controller: 'AddPatientCtrl'
    });
  };

  }]);

  angular.module('halzaPortalAppApp').controller('AddPatientCtrl', function ($scope, $uibModalInstance, authentication, $state, $rootScope) {
  $scope.errMessage = "";
  $scope.isError = false;
  
  $scope.patientSearchList = 
  [{
    Id: "UID01",
    FirstName: "Patient 1 FirstName",
    LastName: "Patient 1 LastName",
    Email: "Patient01@gmail.com"
  },
  {
    Id: "UID02",
    FirstName: "Patient 2 FirstName",
    LastName: "Patient 2 LastName",
    Email: "Patient02@gmail.com"
  }];
  $scope.continue = function () {
    
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
