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

  Login.$inject = ['$mdToast', '$state', '$log', 'LoginService'];

  function Login($mdToast, $state, $log, LoginService) {

    var vm = this;
    vm.isLoggedIn = false;

    vm.loginUser = function(user) {
      var newUser = {
        username: user.username; 
        password: user.password; 
      }
      $log.debug("loginuser: ", user); 
      LoginService.loginUser(newUser)
        .then(function(res) {
          LoginService.broadcastLogin(); 
          $state.go('home.dashboard');
        })
        .catch(fail);
    }

    vm.createUser = function(user) {
      LoginService.registerUser(user)
        .then(function(res) {
          $log.log("register user: ", res); 
          LoginService.broadcastLogin(); 
          $mdToast.showSimple('Account created.'); 
          $state.go('home.dashboard');  
        })
        .catch(function(err){
          $log.error("Error signing up: ", err); 
          $mdToast.showSimple('Error signing up.'); 
        })
        .finally(function() {
          user.email = "";
          user.password = "";
        });
    }

    var fail = function(err) {
      console.error("LoginController error: ", err);
    }

  }

})();
