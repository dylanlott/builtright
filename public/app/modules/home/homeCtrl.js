(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the app
   */

  angular
    .module('builtright')
    .controller('HomeCtrl', Home);

  Home.$inject = ['homeService', 'LoginService', '$log', 'BuildsService', '$rootScope'];

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Home(homeService, LoginService, $log, BuildsService, $rootScope) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = "Hello, BuiltRight!";
    vm.version = "1.0.0";
    vm.user = null;

    $log.info("vm.loggedIn: ", vm.loggedIn);

    activate();

    LoginService.getUserInfo()
      .then(function(res) {
        vm.user = res;
      })

    $rootScope.$on('user-login', function() {
      LoginService.getUserInfo()
        .then(function(res) {
          vm.user = res;
        })
    })


    function activate() {
      BuildsService.getBuilds()
      	.then(function(res){
      		$log.log(res); 
      		vm.builds = res; 
      		return vm.builds; 
      	})
      	.catch(function(err){
      		$log.error("Error retrieving builds: ", err); 
      	}); 

      LoginService.getUserInfo()
        .then(function(res) {
          $log.log("LoginService HomeCtrl: ", res);
          vm.user = res;
          return vm.user;
        })
        .catch(function(err) {
          $log.error("Error getting user: ", err);
        });
    }

  }

})();
