(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:loginCtrl
   * @description
   * # loginCtrl
   * Controller of the app
   */

  angular
    .module('login')
    .controller('LoginCtrl', Login);

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  Login.$inject = ['$mdToast', '$state', '$log', 'LoginService', '$rootScope'];

  function Login($state, $log, $mdToast, LoginService, $rootScope) {

    var vm = this;
    vm.isLoggedIn = false;

    vm.loginUser = function(user){
      LoginService.loginUser(user)
        .then(success)
        .catch(fail); 
    }

    vm.createUser = function(user){
      LoginService.registerUser()
      .then(success)
      .catch(fail); 
    }

    var success = function(res){
      return res; 
    }

    var fail = function(err){
      $log.log("Error Login Ctrl: ", err);
      user.password = ""; 
      user.email = ""; 
    }

  }




})();
