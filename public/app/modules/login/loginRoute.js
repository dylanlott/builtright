'use strict';

/**
 * @ngdoc function
 * @name app.route:loginRoute
 * @description
 * # loginRoute
 * Route of the app
 */

angular.module('login')
  .config(['$stateProvider', function($stateProvider, $firebaseAuth, LoginService) {

    $stateProvider
      .state('home.login', {
        url: '/login',
        templateUrl: 'app/modules/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('home.register', {
        url: '/register',
        templateUrl: 'app/modules/login/register.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });


  }]);
