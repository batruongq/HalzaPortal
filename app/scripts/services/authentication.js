angular.module('halzaPortalAppApp').factory('authentication', ['$http','$localStorage', '$sessionStorage', 'urlConfig',
    function ($http, $localStorage, $sessionStorage, urlConfig){

        var authentication = {};
        var user = {userName: "", access_token:"", remember: false};
        var  config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        authentication.register = function (data, callback, error_callback) {
            var dataRegister = $.param({
                Email: data.email,
                Password: data.password,
                ConfirmPassword: data.confirmPassword
            });
            console.log(urlConfig.register);
            return $http.post(urlConfig.register, dataRegister, config)
            .success(function(responseData) {
                //request to get username and access_token information
                var signInData = $.param({
                    username: data.email,
                    password: data.password,
                    grant_type: "password"
                });
                $http.post(urlConfig.signInByEmail, signInData, config)
                .success(function(response) {
                    user.userName = response.userName;
                    user.access_token = response.access_token;
                    authentication.authenticate(user);
                    if(callback) {
                        callback();
                    }
                });
            })
            .error(function (errResponse){
                if(error_callback) {
                    error_callback(errResponse.messages);
                }
            });
        };

        authentication.signIn = function (data, callback, error_callback) {
            var loginData = $.param({
                username: data.username,
                password: data.password,                
                grant_type: "password"
            });
            return $http.post(urlConfig.signInByEmail, loginData, config)
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
            return $http.post(urlConfig.signInByGoogle, data, config)
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
            return $http.get(urlConfig.signInByLinkedIn, data).then(function successCallback(responseData){
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
