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

  Login.$inject = ['$state', '$log'];

  function Login($state, $log, $mdToast) {

    var vm = this;
    vm.isLoggedIn = false;
    
    //initialize and get current authenticated state:
    // init();

  }




})();
