(function () {
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

	Home.$inject = ['homeService', 'LoginService', '$log'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, LoginService, $log) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Hello, BuiltRight!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

		vm.loggedIn = LoginService.checkLoggedIn(); 
		$log.info("vm.loggedin: ", vm.loggedIn); 
	}

})();
