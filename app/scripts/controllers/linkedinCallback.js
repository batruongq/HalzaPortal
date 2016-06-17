'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the halzaPortalAppApp
 */
angular.module('halzaPortalAppApp')
  .controller('LinkedInCallbackCtrl', ['linkedInCallback', '$scope', 'authentication', '$state',
    function (linkedInCallback, $scope, authentication, $state) {
      var useCode = "";
  		angular.element(document).ready(function () {
        	useCode = linkedInCallback.getUserCode();
      });
      console.log(useCode);
      var data = {
        params : {
            code: useCode
        }
      };

      authentication.signInByLinkedin(data, function() {
            $state.go("home", {}, {reload: true});
        }, function(errResponse) {
            $state.go("signin", {}, {reload: true});
            $scope.errMessage=  errResponse.modelState;
            $scope.isError = true;
      });
        
  }]);
