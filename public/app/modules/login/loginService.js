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
    .factory('LoginService', Login);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  Login.$inject = ['$http', '$log', '$state', '$q'];

  function Login($http, $log, $state, $q) {
    return {
      loginUser: loginUser,
      checkAuth: checkAuth
    }

    function loginUser(user) {
      var user = {
        "username": user.username,
        "password": user.password
      }
      return $http.post('/users/auth', user)
        .then(function(data, status, headers, config) {
          return data;
        })
        .catch(function(err) {
          if (err) {
            $log.error("Error logging in user: ", err);
          }
        })
    }

    function checkAuth() {
      return $http.get('/user')
        .then(function(data) {
          $log.log("checkAuth data: ", data); 
          if(data.data === null || data.data === ""){
            $log.error("UNAUTHED"); 
            $state.go('home.login'); 
          }
        })
        .catch(function(err) {
          $log.error("Error check auth: ", err); 
        })
    }
  }

})();
