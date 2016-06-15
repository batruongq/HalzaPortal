'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('HeaderCtrl', function ($scope, $uibModal, $state, $sessionStorage, $localStorage) {

    $scope.isLogged = false;
    $scope.user = $sessionStorage.user || $localStorage.user;
    $scope.isLogged = $scope.user || false;

     $scope.openSignupPopup = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/views/signUp.html',
            controller: 'ModalInstanceCtrl'
     });
     };

     $scope.signOut = function(){
        delete $sessionStorage.user;
        $scope.isLogged = false;
        $state.go('signin');
     };
  });

  angular.module('halzaPortalAppApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, authentication, $state, $rootScope) {

    $scope.errMessage = "";
    $scope.isError = false;
    $scope.continue = function () {
      $scope.isLoading = true;
      var sendData = $.param({
        UserName: $scope.user.email,
        Password: $scope.user.password,
        ConfirmPassword: $scope.user.confirmPassword
      });

      authentication.register(sendData, function () {
                $scope.isLoading = false;
                $uibModalInstance.close();
                $state.go("home", {}, {reload: true});
            }, function (error) {
                $scope.isLoading = false;
                $scope.errMessage = error.modelState;
                $scope.isError = true;
            })
            
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
});


