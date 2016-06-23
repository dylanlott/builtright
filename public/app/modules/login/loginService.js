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

  LoginService.$inject = ['$log'];

  function LoginService($log) {
    $log.log("LoginService called."); 
    var LoginService = {
      loginUser: loginUser, 
      logoutUser: logoutUser, 
      checkLoggedIn: checkLoggedIn,
      getUserInfo: getUserInfo
    }

    return LoginService; 

    function loginUser(user){
      return $http.post('/api/users/auth', user)
        .then(success)
        .catch(fail); 
    }

    function logoutUser(){
      return $http.get('/api/logout')
        .then(success)
        .catch(fail); 
    }

    function checkLoggedIn(){
      return $http.get('/api/user/loggedin')
        .then(success)
        .catch(fail); 
    }

    function getUserInfo(){
      return $http.get('/api/user')
        .then(success)
        .catch(fail); 
    }

    function success(res){
      return res.data; 
    }

    function fail(err){
      return $log.error("Error in Login Service: ", err); 
    }
  }

})();
