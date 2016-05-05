(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:buildsService
	 * @description
	 * # buildsService
	 * Service of the app
	 */

  	angular
		.module('builds')
		.factory('BuildsService', Builds);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Builds.$inject = ['$http'];

		function Builds ($http) {
			return {
				getBuilds: getBuilds 
			}
		}

		function getBuilds(){
			return $http.get('/builds')
			.success(function(data, status, headers, config){
				$log.info("Builds headers: ", headers); 
				$log.info("Builds status: ", status); 
				$log.info("Builds config: ", config); 
				$log.info("Builds: ", data); 
				return data; 
			})
			.catch(function(err){
				if(err) $log.error("Error retrieving builds: ", err); 
			})
		}

})();
