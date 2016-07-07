(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:LayoutCtrl
	* @description
	* # LayoutCtrl
	* Controller of the app
	*/

	angular
		.module('builtright')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog', 'LoginService', '$log', '$rootScope'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog, LoginService, $log, $rootScope) {
		/*jshint validthis: true */
		var vm = this;

		LoginService.getUserInfo()
		.then(function(user){
			vm.user = user; 
		})
		
		$rootScope.$on('user-login', function(){
			LoginService.getUserInfo()
			.then(function(res){
				vm.user = res; 
			})
		})
		
		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.changePassword = function () {
			$mdToast.show(
				$mdToast.simple()
				.content('Password clicked!')
				.position('top right')
				.hideDelay(2000)
			);
		};

		vm.changeProfile = function (ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'tabDialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			}).then(function(answer) {
				$mdToast.show(
					$mdToast.simple()
					.content('You said the information was "' + answer + '".')
					.position('top right')
					.hideDelay(2000)
				);

			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('You cancelled the dialog.')
					.position('top right')
					.hideDelay(2000)
				);
			});

			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}
		};


		vm.logOut = function () {

			// alert('Implement your Function Here');
			// $cookies.put('dev_appserver_login', ' ');
			//$state.go('out', {}, {reload: true});

			LoginService.logoutUser()
				.then(function(success){
					$mdToast.simple()
						.content('Sorry to see you go!'); 
					$state.go('home.login')
				})
				.catch(function(err){
					$log.error("Error logging out: ", err); 
				})

		};

		var originatorEv;
		vm.openMenu = function ($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

	}

})();
