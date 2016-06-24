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

  LoginService.$inject = ['$log', '$http', '$mdToast'];

  function LoginService($log, $http, $mdToast) {
    // $log.log("LoginService called.");

    var LoginService = {
      registerUser: registerUser,
      loginUser: loginUser,
      logoutUser: logoutUser,
      checkLoggedIn: checkLoggedIn,
      getUserInfo: getUserInfo
    }

    return LoginService;

    function registerUser(user) {
      return $http.post('/api/auth/user', user)
        .then(success)
        .catch(function(err) {
          if (err.status === 409) {
            $mdToast.show($mdToast.simple().textContent('User with that email already exists.'));
          }
        });
    }

    function loginUser(user) {
      return $http.post('/api/auth/', user)
        .then(success)
        .then(function(res){
          $mdToast.showSimple('Logged in.');
        })
        .catch(fail);
    }

    function logoutUser() {
      return $http.get('/api/auth/logout')
        .then(success)
        .catch(fail);
    }

    function checkLoggedIn() {
      $http.get('/api/auth/')
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          // $log.log("LoginService checkLoggedIn: ", err);
          return err;
        });
    }

    function getUserInfo() {
      return $http.get('/api/auth/user')
        .then(success)
        .catch(fail);
    }

    function success(res) {
      return res.data;
    }

    function fail(err) {
      return $log.error("Error in Login Service: ", err);
    }
  }

})();
