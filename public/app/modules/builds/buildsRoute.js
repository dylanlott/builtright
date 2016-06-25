'use strict';

/**
 * @ngdoc function
 * @name app.route:buildsRoute
 * @description
 * # buildsRoute
 * Route of the app
 */

angular.module('builds')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('home.builds', {
        url: '/builds',
        templateUrl: 'app/modules/builds/builds.html',
        controller: 'BuildsCtrl',
        controllerAs: 'vm',
        resolve: {
          checkAuth: checkLoggedIn
        }
      })
      .state('home.create_build', {
        url: '/builds/create',
        templateUrl: 'app/modules/builds/create_build.html',
        controller: 'BuildsCtrl',
        controllerAs: 'vm',
        resolve: {
          checkAuth: checkLoggedIn
        }
      })
      .state('home.build_detail', {
        url: '/builds/:id', 
        templateUrl: 'app/modules/builds/build_detail.html', 
        controller: 'BuildDetailCtrl', 
        controllerAs: 'vm', 
        resolve: {
          checkAuth: checkLoggedIn
        }
      });


  }]);


function checkLoggedIn(LoginService, $state, $log) {
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
