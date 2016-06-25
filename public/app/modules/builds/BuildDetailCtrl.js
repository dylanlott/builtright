(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:BuildDetailCtrl
   * @description
   * # BuildDetailCtrl
   * Controller of the app
   */

  angular
    .module('builds')
    .controller('BuildDetailCtrl', BuildDetails)

	  BuildDetails.$inject = ['BuildsService', '$log', '$mdToast', '$state', '$stateParams'];

	  function BuildDetails(BuildsService, $log, $mdToast, $state, $stateParams) {
	    /*jshint validthis: true */
	    var vm = this;

      $log.info("state params: ", $stateParams.id);
      var id = $stateParams.id; 
	    
      $log.log("BuildDetailCtrl running."); 

      activate(); 

      function activate() {
        BuildsService.getBuildDetails(id)
          .then(function(res){
            $log.log("build info: ", res); 
            vm.build = res; 
          })
          .catch(function(err){
            if(err){
              $log.error("Error retrieving build info: "); 
              $mdToast.showSimple("Error retrieving build information."); 
            }
          })
      }


	  }

})();
