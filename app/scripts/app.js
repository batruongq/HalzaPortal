'use strict';

/**
 * @ngdoc overview
 * @name halzaPortalAppApp
 * @description
 * # halzaPortalAppApp
 *
 * Main module of the application.
 */
 angular
 .module('halzaPortalAppApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'googleplus',
  'ui.router',
  'ui.bootstrap',
  'angularSpinner',
  'ngStorage'
  ])
 .config(['$routeProvider', 'GooglePlusProvider', '$stateProvider', '$locationProvider',
  function ($routeProvider, GooglePlusProvider, $stateProvider, $locationProvider) {

    $stateProvider
    .state('root',{
      url: '',
      abstract: true,
      views: {
        'header': {
          templateUrl: 'views/header.html',
          controller: 'HeaderCtrl'
        },
        'footer':{
          templateUrl: 'views/footer.html'
        }
      }
    })
    .state('signin', {
      url: '/',
      parent: 'root',
      views: {
        'content@': {
          templateUrl: 'views/signIn.html'
        }
      }
    })
    .state("home", {
      url: "/home",
      parent: 'root',
      views: {
        'content@': {
          templateUrl: 'views/home.html',
          controller: "HomeCtrl"
        }
      }
    })
    .state("linkedCallBack", {
      url: "/callback",
      parent: 'root',
      views: {
        'content@': {
          templateUrl: 'views/linkedCallBack.html',
          controller: "LinkedInCallbackCtrl"
        }
      }
    })
    .state("updateProfile", {
      resolve:{
        user: function(userService, authentication, $sessionStorage, $localStorage, $http){
              // TODO: get user profile
              // var user = authentication.getUser();
              // var sendData = {
              //   params : {
              //     email: user.userName
              //   }
              // }
              //return userService.getProfile(sendData);
              return userService.getProfile();
            }
          },
          url: "/updateProfile",
          parent: 'root',
          views: {
            'content@': {
              templateUrl: 'views/updateProfile.html',
              controller: "UpdateProfileCtrl",
              controllerAs: 'controller'
              
            }
          }
        });

    $locationProvider.html5Mode(true);

    GooglePlusProvider.init({
      clientId: '287960208155-j02ht1m0pi7r96kj6mm2jscfalkjhgt2.apps.googleusercontent.com',
      clientSecret: 'oscasdvLBpGKnZTErzRdmBXO'
    });
    GooglePlusProvider.setScopes('profile email');      
  }])
 .run(['$rootScope', '$state', '$timeout', '$http', 'authentication', function ($rootScope, $state, $timeout, $http, authentication) {
  $rootScope.$on('$stateChangeStart', function(event, state, params)
  {
    var without_login_states = ['signin', 'linkedCallBack'];
    if($.inArray( state.name, without_login_states )<0 && !authentication.authorize()) {
      $timeout(function() {
        $state.go('signin');
      });
    }
    if(authentication.authorize()) {
      $http.defaults.headers.common.Authorization = "Bearer " + authentication.getUser().access_token;
      if(state.name == "signin"){
        $timeout(function() {
          $state.go('home');
        });
      }
    }
  });
}])
.constant('urlConfig', {
      apiServer: 'http://192.168.190.92:3003/',
      register:   'http://192.168.190.92:3003/api/Account/Register',
      signInByEmail:  'http://192.168.190.92:3003/token',
      signInByGoogle:  'http://192.168.190.92:3003/api/Account/ObtainLocalAccessToken',
      signInByLinkedIn:  'http://192.168.190.92:3003/api/Account/requestLinkedInToken',
      getProfile: 'http://192.168.190.92:3003/api/Account/GetUser',
      updateProfile: 'http://192.168.190.92:3003/api/Account/EditProfile'
  }
);
