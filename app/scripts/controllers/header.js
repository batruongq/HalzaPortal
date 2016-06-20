'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the halzaPortalAppApp
 */
 angular.module('halzaPortalAppApp')
 .controller('HeaderCtrl', function ($scope, $uibModal, $state, $sessionStorage, $localStorage, $http, 
  GooglePlus, linkedInCallback, authentication, userService, urlConfig) {

  $scope.isLogged = false;
  $scope.user = $sessionStorage.user || $localStorage.user;
  $scope.isLogged = $scope.user || false;

  if($scope.isLogged){
    userService.getProfile().then(function successCalback(response){
      $scope.userPhoto = urlConfig.apiServer + response.data.Photo;
    });
  }
  

  $scope.openSignupPopup = function(){
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/views/signUp.html',
      controller: 'ModalInstanceCtrl'
    });
  };

  $scope.signOut = function(){
    delete $sessionStorage.user;
    delete $localStorage.user;
    delete $http.defaults.headers.common.Authorization;
    $scope.isLogged = false;
    $state.go('signin');
  };

  //sign in by google
  $scope.loginByGoogle = function () {
    GooglePlus.login().then(function (authResult) {
      GooglePlus.getUser().then(function (user) {
        var sendData = $.param({
          provider: 'Google',
          externalAccessToken: authResult.access_token,
          email: user.email,
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
      var client_id = urlConfig.linkedClientId;
      var redirect_uri = 'http://localhost:3000/callback';
      window.location = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="
      + client_id + "&redirect_uri=" +  redirect_uri + "&state=987654321&scoper_emailaddress"; 
    };

  });

 angular.module('halzaPortalAppApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, authentication, $state, $rootScope) {
  $scope.errMessage = "";
  $scope.isError = false;
  
  $scope.continue = function () {
    $scope.isLoading = true;
    
    authentication.register($scope.user, function () {
      $scope.isLoading = false;
      $uibModalInstance.close();
      $state.go("home", {}, {reload: true});
    }, function (error) {
      $scope.isLoading = false;
      $scope.errMessage = error.email[0];
      $scope.isError = true;
    })

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


