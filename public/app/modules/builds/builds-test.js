(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:buildsTest
	 * @description
	 * # buildsTest
	 * Test of the app
	 */

	describe('builds test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('builtright');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('BuildsCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
