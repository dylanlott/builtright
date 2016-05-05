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

		Login.$inject = ['LoginService'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Login(LoginService) {
			/*jshint validthis: true */
			var vm = this;

			vm.loginUser(user){
				LoginService.loginUser(user)
				.then(function(data){
					$log.log("loginUser controller data: ", data); 
				})
				.catch(function(err){
					if(err) $log.error("error logging in user: ", err); 
				})
			}

		}

})();
