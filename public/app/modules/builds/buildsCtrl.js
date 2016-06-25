(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:buildsCtrl
   * @description
   * # buildsCtrl
   * Controller of the app
   */

  angular
    .module('builds')
    .controller('BuildsCtrl', Builds)

	  Builds.$inject = ['BuildsService', '$http', '$log', '$mdToast', '$state'];

	  function Builds(BuildsService, $http, $log, $mdToast, $state) {
	    /*jshint validthis: true */
	    var vm = this;
	    vm.addBuild = false;

      activate(); 

	    $log.log("BuildsCtrl running. ");
	    
      vm.createBuild = function(build){
        BuildsService.createBuild(build)
          .then(function(data){
            $log.log("create build res: ", data); 
            $mdToast.showSimple('Build submitted!');
            $state.go('home.builds'); 
          })
          .catch(function(err){
            $mdToast.showSimple('Error creating build: ', err); 
          })
      }

      function activate() {
        BuildsService.getBuilds()
          .then(function(res){
            vm.builds = res;
          })
      }
	  }

})();
