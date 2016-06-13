'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('LinkedInCallbackCtrl', ['linkedInCallback', '$scope', 'authentication', '$location', '$rootScope', '$state',
    function (linkedInCallback, $scope, authentication, $location, $rootScope, $state) {

      $scope.access_token = "";
      var useCode = "";

  		angular.element(document).ready(function () {
        	useCode = linkedInCallback.getUserCode();
      });

      console.log(useCode);

      var config = {
        params : {
            code: useCode
        }
      };

      authentication.signInByLinkedin(config)
        .then(
          function successCallback(response) {
            $scope.access_token = response.data.access_token;
            $rootScope.$broadcast('user:logged', response.data);
            $state.go('home');

        }
        , function errorCallback(response) {
            $state.go('signin');
            $scope.errMessage=  response.modelState;
            $scope.isError = true;
      });
        
  }]);
