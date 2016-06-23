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
    $log.log("LoginService called."); 
    
    var LoginService = {
      registerUser: registerUser,
      loginUser: loginUser, 
      logoutUser: logoutUser, 
      checkLoggedIn: checkLoggedIn,
      getUserInfo: getUserInfo
    }

    return LoginService; 

    function registerUser(user){
      return $http.post('/api/users', user)
        .then(success)
        .catch(function(err){
          if(err.status === 409){
            $mdToast.show($mdToast.simple().textContent('User with that email already exists.'));
          }
        }); 
    }

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
