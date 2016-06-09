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

	Home.$inject = ['homeService', '$log', '$state'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, $log, $state) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Hello, builtright!";
		vm.version = "1.0.0";

		function activate() {
			homeService.getUser(); 
		}
	}

})();
