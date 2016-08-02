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
      LoginService.loginUser(user)
        .then(function(res) {
          LoginService.broadcastLogin();
          $state.go('home.dashboard');
        })
        .catch(fail);
    }

    vm.createUser = function(user) {
      var login = {
        username: user.email,
        password: user.password
      }
      LoginService.registerUser(login)
        .then(function(res) {
          $log.log("register user response: ", res); 
          LoginService.loginUser(login)
            .then(function(res){
              LoginService.broadcastLogin();
              $mdToast.showSimple('Account created.');
            })
        })
        .catch(function(err){
          $log.error("Error signing up: ", err);
          $mdToast.showSimple('Error signing up.');
        })
    }

    var fail = function(err) {
      console.error(err);
    }

  }

})();
