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

			$log.log("LoginController running."); 

			vm.loginUser = function(user){
				$log.log("loginUser hit."); 
				LoginService.loginUser(user)
				.then(function(data){
					$log.debug(data); 
				})
				.catch(function(err){
					if(err) $log.error("Error logging in user: ", err); 
				})
			}

		}

})();
