'use strict';

/**
 * @ngdoc function
 * @name app.route:HomeRoute
 * @description
 * # HomeRoute
 * Route of the app
 */

angular.module('builtright')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider

      .state('home', {
        url: '',
        abstract: true,
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/home/dashboard.html',
        resolve: {
          checkAuth: checkLoggedIn
        }
      });

  }]);

function checkLoggedIn(LoginService, $state, $log) {
  console.log("checkAuth resolve.");
  LoginService.getUserInfo()
    .then(function(res) {
      $log.log("getUserInfo: ", res);
      if (res === undefined) {
        $state.go('home.login');
      } else {
        return true
      }
    })
}
