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
    'ui.router'
  ])
  .config(['$routeProvider', 'GooglePlusProvider', '$stateProvider', 
    function ($routeProvider, GooglePlusProvider, $stateProvider) {

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
      .state("signup", {
          url: "/signup",
          parent: 'root',
          views: {
            'content@': {
              templateUrl: 'views/signup.html',
              controller: "SignUpCtrl"
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
      .state("updateProfile", {
          url: "/updateProfile",
          parent: 'root',
          views: {
            'content@': {
              templateUrl: 'views/updateProfile.html',
              controller: "UpdateProfileCtrl"
            }
          },
           params: {
            email: null,
            accessTocken: null
          }
        });

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
      clientId: '20743198667-jv4bi49469j8qhb5g81e6l7hk8347rl0.apps.googleusercontent.com',
      apiKey: 'AIzaSyBECp7P7lzkX89-wqXPLyB2EMthV0kR4zE'
    });
      
  }]);
