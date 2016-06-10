'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('LinkedInCallbackCtrl', ['linkedInCallback', '$scope', 'authentication', '$location', '$rootScope',
    function (linkedInCallback, $scope, authentication, $location, $rootScope) {

      $scope.access_token = "";
      var useCode = "";

  		angular.element(document).ready(function () {
        	useCode = linkedInCallback.getUserCode();
      });

      var sendData = $.param({
          code: useCode
      });

      var config = {
            headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
      }

      authentication.signInByLinkedin(sendData, config)
        .then(
          function successCallback(response) {
            $scope.access_token = response.data.access_token;
            $rootScope.$broadcast('user:logged', response.data);
            $location.path("/home");

        }, function errorCallback(response) {
            $location.path("/");
      });
  }]);
