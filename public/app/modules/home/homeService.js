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
			getBuilds: getBuilds
		};

		function getBuilds() {
			return $http.get('/api/builds')
				.then(function(res){
					return res; 
				})
				.catch(function(err){
					$log.error("Error retrieving builds: ", err); 
				})
		}

	}

})();
