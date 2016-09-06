(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:loginService
   * @description
   * # loginService
   * Service of the app
   */

  angular
    .module('login')
    .factory('LoginService', LoginService);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  LoginService.$inject = ['$log', '$http', '$mdToast', '$state', '$rootScope'];

  function LoginService($log, $http, $mdToast, $state, $rootScope) {

    var LoginService = {
      registerUser: registerUser,
      loginUser: loginUser,
      logoutUser: logoutUser,
      checkLoggedIn: checkLoggedIn,
      getUserInfo: getUserInfo,
      broadcastLogin: broadcastLogin
    }

    return LoginService;

    function registerUser(user) {
      return $http.post('/api/auth/user', user)
        .then(success)
        .catch(fail);
    }

    function loginUser(user) {
      return $http.post('/api/auth/login', user)
        .then(success)
        .then(function(res) {
          $state.go('home.dashboard');
        })
        .catch(fail);
    }

    function logoutUser() {
      return $http.get('/api/auth/logout')
        .then(function(res) {
          $mdToast.showSimple('Logged out.');
        })
        .catch(fail);
    }

    function checkLoggedIn() {
      $http.get('/api/auth/')
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          return err;
        });
    }

    function getUserInfo() {
      return $http.get('/api/auth/user')
        .then(success)
        .catch(fail);
    }

    function broadcastLogin() {
      $rootScope.$broadcast('user-login');
      $log.log("$rootscope.$broadcast user-login");
    }

    function broadcastLogout() {
      $rootScope.$broadcast('user-logout');
      $log.log("$rootscope.$broadcast user-logout");
    }

    function success(res) {
      return res.data;
    }

    function fail(err) {
      return $log.error("Error in Login Service: ", err);
    }
  }

})();
