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
      .state("testmodal", {
          url: "/test",
          parent: 'root',
          views: {
            'content@': {
              templateUrl: 'views/modal.html',
              controller: "ModalDemoCtrl"
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
            user: function($http){
              // TODO: get user profile
              return {
                name: 'Truong Thi Ba',
                gender:'Female',
                offices: ['office 1', 'office 2'],
                phones: ['01695440212', '0196748321']
              }
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

    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl',
    //     controllerAs: 'main'
    //   })
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl',
    //     controllerAs: 'about'
    //   })
    //   .when('/signup', {
    //     templateUrl: 'views/signUp.html',
    //     controller: 'SignUpCtrl',
    //     controllerAs: 'signUp'
    //   })
    //   .when('/home', {
    //     templateUrl: 'views/home.html',
    //     controller: 'HomeCtrl',
    //     controllerAs: 'home'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });

      GooglePlusProvider.init({
      clientId: '287960208155-j02ht1m0pi7r96kj6mm2jscfalkjhgt2.apps.googleusercontent.com',
      clientSecret: 'oscasdvLBpGKnZTErzRdmBXO'
    });
      GooglePlusProvider.setScopes('profile email');      
  }]);
