(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:loginCtrl
	* @description
	* # loginCtrl
	* Controller of the app
	*/

  	angular
		.module('login')
		.controller('LoginCtrl', Login);

		Login.$inject = ['LoginService', '$log'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Login(LoginService, $log) {
			/*jshint validthis: true */
			var vm = this;

		}

})();
