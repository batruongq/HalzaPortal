angular.module('halzaPortalAppApp').factory('authentication', ['$http','$localStorage', '$sessionStorage', 
    function ($http, $localStorage, $sessionStorage){

    var urlAccountRegister = 'http://192.168.190.92:3001/api/Account/Register';
    var urlLogin = 'http://192.168.190.92:3001/token';
    var urlLoginByGoogle = 'http://192.168.190.92:3001/api/Account/ObtainLocalAccessToken';
    var urlLoginByLinkedin = 'http://192.168.190.92:3001/api/Account/requestLinkedInToken';

    var authentication = {};
    var user = {userName: "", access_token:"", remember: false};
    var  config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    authentication.register = function (data, callback, error_callback) {
        return $http.post(urlAccountRegister, data, config)
        .success(function(responseData) {
            user.userName = responseData.userName;
            user.access_token = responseData.access_token;
            authentication.authenticate(user);
            if(callback) {
                callback();
            }
            })
        .error(function (errResponse){
            if(error_callback) {
                error_callback(errResponse);
            }
        });
    };

    authentication.signIn = function (data, callback, error_callback) {
        return $http.post(urlLogin, data, config)
        .success(function(responseData) {
            user.userName = responseData.userName;
            user.access_token = responseData.access_token;
            user.remember = data.remember;
            authentication.authenticate(user);
            if(callback) {
                callback();
            }
            })
        .error(function (errResponse){
            if(error_callback) {
                error_callback(errResponse);
            }
        });
    };

    authentication.signInByGoogle = function (data, callback, error_callback) {
        return $http.post(urlLoginByGoogle, data, config)
        .success(function(responseData){
            user.userName = responseData.userName;
            user.access_token = responseData.access_token;
            authentication.authenticate(user);
            if(callback) {
                callback();
            }
        })
        .error(function(errorResponse){
            if(error_callback) {
                error_callback(errResponse);
            }
        });
    };

    authentication.signInByLinkedin = function(data, callback, error_callback){
        return $http.get(urlLoginByLinkedin, data).then(function successCallback(responseData){
            user.userName = responseData.data.userName;
            user.access_token = responseData.data.access_token;
            authentication.authenticate(user);
            if(callback) {
                callback();
            }
        }
        ,function errorCallback(errResponse){
            if(error_callback) {
                error_callback(errResponse);
            }
        });
    }

    authentication.authorize = function() {
        var user = $sessionStorage.user || $localStorage.user;
        return user || false;
    }

    authentication.getUser = function() {
        return $sessionStorage.user || $localStorage.user;
    }

    authentication.authenticate = function(user) {
        if(user.remember){
            $localStorage.user = user;
        } else {
            $sessionStorage.user = user;
        }
    }

    return authentication;
}]);
