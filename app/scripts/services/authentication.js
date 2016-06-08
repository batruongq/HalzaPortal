angular.module('halzaPortalAppApp').factory('authentication', ['$http', function ($http){

    var urlAccountRegister = 'http://192.168.191.243/api/Account/Register';
    var urlLogin = 'http://192.168.191.243/token';

    var authentication = {};

    authentication.register = function (data) {
        return $http.post(urlAccountRegister, data);
    };

    authentication.signIn = function (data) {
        return $http.post(urlLogin, data);
    };

    return authentication;
}]);
