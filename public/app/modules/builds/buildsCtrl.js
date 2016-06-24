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

	  Builds.$inject = ['BuildsService', '$http', '$log'];

	  function Builds(BuildsService, $http, $log) {
	    /*jshint validthis: true */
	    var vm = this;
	    vm.addBuild = false;

	    $log.log("BuildsCtrl running. ");
	    
      vm.createBuild = function(build){
        BuildsService.createBuild(build)
      }
	  }

})();
