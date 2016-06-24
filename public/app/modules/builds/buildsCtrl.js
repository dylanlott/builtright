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

	  Builds.$inject = ['BuildsService', '$http', '$log', '$mdToast'];

	  function Builds(BuildsService, $http, $log, $mdToast) {
	    /*jshint validthis: true */
	    var vm = this;
	    vm.addBuild = false;

	    $log.log("BuildsCtrl running. ");
	    
      vm.createBuild = function(build){
        BuildsService.createBuild(build)
          .then(function(data){
            $log.log("create build res: ", data); 
            $mdToast.showSimple('Hello');
            $state.go('home.builds'); 
          })
          .catch(function(err){
            $mdToast.showSimple('Error creating build: ', err); 
          })
      }
	  }

})();
