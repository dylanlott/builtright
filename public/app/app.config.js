(function () {
	'use strict';

	/**
	* @ngdoc configuration file
	* @name app.config:config
	* @description
	* # Config and run block
	* Configutation of the app
	*/


	angular
		.module('builtright')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

		
			$urlRouterProvider
			.otherwise('/dashboard');
			
			}

			runBlock.$inject = ['$rootScope', 'LoginService', '$log', '$state'];

			function runBlock($rootScope, LoginService, $log, $state) {
				'use strict';

				console.log('AngularJS run() function...');

				// LoginService.checkAuth()
				// .then(function(data){
				// 	if(data === null || data === ''){
				// 		$state.go('home.login'); 
				// 	}
				// })
			}


		})();
