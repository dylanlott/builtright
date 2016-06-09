(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

	angular.module('builtright')
		.factory('homeService', homeService);

	homeService.$inject = ['$http', '$log'];

	function homeService($http, $log) {

		return {
			getUser: getUser,
			getBuilds: getBuilds
		};

		function getUser(){
			return $http.get('/user')
				.then(function(data, status, headers, config){
					$log.info("User data: ", data.data); 
				})
				.catch(function(err){
					if(err) $log.error("Error getting current user: ", err); 
				});
		}

		function getBuilds(){
			return $http.get('/builds')
			.then(function(data, status, headers, config){
				$log.info("Builds: ", data.data); 
				$log.info("Builds status: ", status); 	
			})
			.catch(function(err){
				if(err) $log.error("Error retrieving builds. ", err); 
			}); 
		}

	}

})();
