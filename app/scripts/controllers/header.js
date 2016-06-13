'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('HeaderCtrl', function ($scope, $uibModal, $location, $state, $rootScope) {

    $scope.isLogged = false;
    $scope.user = {};

    $scope.$on('user:logged', function(event, user) {
      $scope.user = user;
      $scope.user.email = user.userName;
      $scope.isLogged = true;
    });

     $scope.openSignupPopup = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/views/signUp.html',
            controller: 'ModalInstanceCtrl'
     });
     };

     $scope.signOut = function(){
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

      var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      authentication.register(sendData, config)
            .success(function (dataBack) {
                $scope.isLoading = false;
                $uibModalInstance.close();
                $rootScope.$broadcast('user:logged', dataBack);
                $state.go('home');
            })
            .error(function (error) {
                $scope.isLoading = false;
                $scope.errMessage = error.modelState;
                $scope.isError = true;
            });
    
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


