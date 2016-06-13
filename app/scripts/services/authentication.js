angular.module('halzaPortalAppApp').factory('authentication', ['$http', function ($http){

    var urlAccountRegister = 'http://192.168.190.92:3001/api/Account/Register';
    var urlLogin = 'http://192.168.190.92:3001/token';
    var urlLoginByGoogle = 'http://192.168.190.92:3001/api/Account/ObtainLocalAccessToken';
    var urlLoginByLinkedin = 'http://192.168.190.92:3001/api/Account/requestLinkedInToken';

    var authentication = {};

    authentication.register = function (data, config) {
        return $http.post(urlAccountRegister, data, config);
    };

    authentication.signIn = function (data, config) {
        return $http.post(urlLogin, data, config);
    };

    authentication.signInByGoogle = function (data, config) {
        return $http.post(urlLoginByGoogle, data, config);
    };

    authentication.signInByLinkedin = function(config){
        return $http.get(urlLoginByLinkedin, config);
    }

    authentication.isAuthenticated = function(){
        
    }

    return authentication;
}]);
