angular.module('halzaPortalAppApp').factory('authentication', ['$http', function ($http){

    var urlAccountRegister = 'http://192.168.190.92:3000/api/Account/Register';
    var urlLogin = 'http://192.168.190.92:3000/token';
    var urlLoginByGoogle = 'http://192.168.190.92:3000/api/Account/ObtainLocalAccessToken?provider=Google&externalAccessToken=ya29.CjD9AlYghYbFWojLzdDVvBMuamEKMviwJlAOxqKzozLJzRJ9S5JznCS0XRhnpdGg-tU&userName=thiba.t208@gmail.com&userId=110421420562171026853';
    var urlLoginByLinkedin = "http://192.168.190.92:3000/api/Account/requestLinkedInToken?";

    var authentication = {};

    authentication.register = function (data, config) {
        console.log('register');

        return $http.post(urlAccountRegister, data, config);
    };

    authentication.signIn = function (data, config) {
        return $http.post(urlLogin, data, config);
    };

    authentication.signInByGoogle = function (data, config) {

        return $http.get(urlLoginByGoogle, data, config);
    };

    authentication.signInByLinkedin = function(data, config){
        console.log(data);
        return $http.get(urlLoginByLinkedin + data);
    }

    return authentication;
}]);
