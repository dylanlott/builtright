/*!
* builtright - v0.0.1 - MIT LICENSE 2016-07-07. 
* @author Hivemind Apps
*/
(function() {
  'use strict';

  /**
   * @ngdoc index
   * @name app
   * @description
   * # app
   *
   * Main modules of the application.
   */

  angular.module('builtright', [
    'ngResource',
    'ngAria',
    'ui.bootstrap',
    'ngMaterial',
    'ngMdIcons',
    'ngCookies',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'home',
    'builds',
    'login',
  ]);

})();

(function() {
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

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider'];

  function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {

    // $locationProvider.hashPrefix('!');

    // This is required for Browser Sync to work poperly
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $mdThemingProvider.theme('default')
      .primaryPalette('deep-orange')
      .accentPalette('grey');
      
    $urlRouterProvider
      .otherwise('/dashboard');

  }

  runBlock.$inject = ['$rootScope'];

  function runBlock($rootScope) {
    'use strict';
    
    console.log('Builtright is online.'); 

  }


})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:buildsModule
	 * @description
	 * # buildsModule
	 * Module of the app
	 */

  	angular.module('builds', []);

})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.module:homeModule
	* @description
	* # homeModule
	* Module of the app
	*/

	angular.module('home', []);
})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:loginModule
	 * @description
	 * # loginModule
	 * Module of the app
	 */

  	angular.module('login', []);

})();

'use strict';

/**
 * @ngdoc function
 * @name app.route:buildsRoute
 * @description
 * # buildsRoute
 * Route of the app
 */

angular.module('builds')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('home.builds', {
        url: '/builds',
        templateUrl: 'app/modules/builds/builds.html',
        controller: 'BuildsCtrl',
        controllerAs: 'vm',
        resolve: {
          checkAuth: checkLoggedIn
        }
      })
      .state('home.create_build', {
        url: '/builds/create',
        templateUrl: 'app/modules/builds/create_build.html',
        controller: 'BuildsCtrl',
        controllerAs: 'vm',
        resolve: {
          checkAuth: checkLoggedIn
        }
      })
      .state('home.build_detail', {
        url: '/builds/:id', 
        templateUrl: 'app/modules/builds/build_detail.html', 
        controller: 'BuildDetailCtrl', 
        controllerAs: 'vm', 
        resolve: {
          checkAuth: checkLoggedIn
        }
      });


  }]);


function checkLoggedIn(LoginService, $state, $log) {
  LoginService.getUserInfo()
    .then(function(res) {
      $log.log("getUserInfo: ", res);
      if (res === undefined) {
        $state.go('home.login');
      } else {
        return true
      }
    })
}

'use strict';

/**
 * @ngdoc function
 * @name app.route:HomeRoute
 * @description
 * # HomeRoute
 * Route of the app
 */

angular.module('builtright')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider

      .state('home', {
        url: '',
        abstract: true,
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/home/dashboard.html',
        controller: 'HomeCtrl', 
        controllerAs: 'vm',
        resolve: {
          checkAuth: checkLoggedIn
        }
      });

  }]);

function checkLoggedIn(LoginService, $state, $log) {
  console.log("checkAuth resolve.");
  LoginService.getUserInfo()
    .then(function(res) {
      $log.log("getUserInfo: ", res);
      if (res === undefined) {
        $state.go('home.login');
      } else {
        return true
      }
    })
}

'use strict';

/**
 * @ngdoc function
 * @name app.route:loginRoute
 * @description
 * # loginRoute
 * Route of the app
 */

angular.module('login')
  .config(['$stateProvider', function($stateProvider, $firebaseAuth, LoginService) {

    $stateProvider
      .state('home.login', {
        url: '/login',
        templateUrl: 'app/modules/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('home.register', {
        url: '/register',
        templateUrl: 'app/modules/login/register.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });


  }]);

(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:BuildDetailCtrl
   * @description
   * # BuildDetailCtrl
   * Controller of the app
   */

  angular
    .module('builds')
    .controller('BuildDetailCtrl', BuildDetails)

	  BuildDetails.$inject = ['BuildsService', '$log', '$mdToast', '$state', '$stateParams'];

	  function BuildDetails(BuildsService, $log, $mdToast, $state, $stateParams) {
	    /*jshint validthis: true */
	    var vm = this;

      $log.info("state params: ", $stateParams.id);
      var id = $stateParams.id; 
	    
      $log.log("BuildDetailCtrl running."); 

      activate(); 

      function activate() {
        BuildsService.getBuildDetails(id)
          .then(function(res){
            $log.log("build info: ", res); 
            vm.build = res; 
          })
          .catch(function(err){
            if(err){
              $log.error("Error retrieving build info: "); 
              $mdToast.showSimple("Error retrieving build information."); 
            }
          })
      }


	  }

})();

(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:buildsCtrl
   * @description
   * # buildsCtrl
   * Controller of the app
   */

  angular
    .module('builds')
    .controller('BuildsCtrl', Builds)

	  Builds.$inject = ['BuildsService', '$http', '$log', '$mdToast', '$state'];

	  function Builds(BuildsService, $http, $log, $mdToast, $state) {
	    /*jshint validthis: true */
	    var vm = this;
	    vm.addBuild = false;

      activate(); 

	    $log.log("BuildsCtrl running. ");
	    
      vm.createBuild = function(build){
        BuildsService.createBuild(build)
          .then(function(data){
            $log.log("create build res: ", data); 
            $mdToast.showSimple('Build submitted!');
            $state.go('home.builds'); 
          })
          .catch(function(err){
            $mdToast.showSimple('Error creating build: ', err); 
          })
      }

      function activate() {
        BuildsService.getBuilds()
          .then(function(res){
            vm.builds = res;
          })
      }
	  }

})();

(function() {
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

  Home.$inject = ['homeService', 'LoginService', '$log', 'BuildsService', '$rootScope'];

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Home(homeService, LoginService, $log, BuildsService, $rootScope) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = "Hello, BuiltRight!";
    vm.version = "1.0.0";
    vm.user = null;

    $log.info("vm.loggedIn: ", vm.loggedIn);

    activate();

    LoginService.getUserInfo()
      .then(function(res) {
        vm.user = res;
      })

    $rootScope.$on('user-login', function() {
      LoginService.getUserInfo()
        .then(function(res) {
          vm.user = res;
        })
    })


    function activate() {
      BuildsService.getBuilds()
      	.then(function(res){
      		$log.log(res); 
      		vm.builds = res; 
      		return vm.builds; 
      	})
      	.catch(function(err){
      		$log.error("Error retrieving builds: ", err); 
      	}); 

      LoginService.getUserInfo()
        .then(function(res) {
          $log.log("LoginService HomeCtrl: ", res);
          vm.user = res;
          return vm.user;
        })
        .catch(function(err) {
          $log.error("Error getting user: ", err);
        });
    }

  }

})();

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

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog', 'LoginService', '$log'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog, LoginService, $log) {
		/*jshint validthis: true */
		var vm = this;

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

(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:SidenavCtrl
   * @description
   * # SidenavCtrl
   * Controller of the app
   */
  angular
    .module('builtright')
    .controller('SidenavCtrl', SidenavCtrl)
    .controller('SettingsCtrl', SettingsCtrl);

  // Injecting Denpendencies

  SidenavCtrl.$inject = ['$log', '$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope', 'LoginService', '$rootScope'];
  SettingsCtrl.$inject = ['$mdBottomSheet'];

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function SidenavCtrl($log, $mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope, LoginService, $rootScope) {
    /*jshint validthis: true */
    var vm = this;

    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    vm.closeSidenav = function() {
      $mdSidenav('left').close();
    };

    LoginService.getUserInfo()
      .then(function(res){
        vm.user = res; 
      })

    $rootScope.$on('user-login', function(){
      LoginService.getUserInfo()
        .then(function(res){
          $mdToast.showSimple('User Updated.'); 
          vm.user = res; 
        })
    })

    // Close menu on small screen after click on menu item.
    // Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
    $scope.$on('$stateChangeSuccess', vm.closeSidenav);

    vm.menu = MenuService.listMenu();

    vm.admin = [{
      link: 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'settings'
    }];

    vm.navigateTo = function(target) {

      var page = target;
      $state.go(page);

    };

    vm.showSettingsBottom = function($event) {
      vm.alert = '';
      $mdBottomSheet.show({
        template: '<md-bottom-sheet class="md-grid" layout="column" ng-cloak><div layout="row" layout-align="center center"><h4>With clickOutsideToClose option, drag down or press ESC to close</h4></div><md-list flex layout="row" layout-align="center center"><md-list-item ng-repeat="item in vm.items"><md-button class="md-grid-item-content" ng-click="vm.listItemClick($index)"><md-icon class="md-48">{{item.icon}}</md-icon><div class="md-grid-text"> {{ item.name }} </div></md-button></md-list-item></md-list></md-bottom-sheet>',
        controller: 'SettingsCtrl',
        controllerAs: 'vm',
        targetEvent: $event
      }).then(function(clickedItem) {
        $mdToast.show(
          $mdToast.simple()
          .content(clickedItem.name + ' clicked!')
          .position('top right')
          .hideDelay(2000)
        );
      });
    };

  }

  function SettingsCtrl($mdBottomSheet) {
    /*jshint validthis: true */
    var vm = this;

    vm.items = [
      { name: 'Roles', icon: 'assignment_ind' },
      { name: 'Notes', icon: 'speaker_notes' },
      { name: 'Tasks', icon: 'view_list' },
      { name: 'Inbox', icon: 'inbox' }
    ];

    vm.listItemClick = function($index) {
      var clickedItem = vm.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  }

})();

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

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  Login.$inject = ['$mdToast', '$state', '$log', 'LoginService'];

  function Login($mdToast, $state, $log, LoginService) {

    var vm = this;
    vm.isLoggedIn = false;

    vm.loginUser = function(user) {
      LoginService.loginUser(user)
        .then(function(res) {
          LoginService.broadcastLogin(); 
          $state.go('home.dashboard');
        })
        .catch(fail);
    }

    vm.createUser = function(user) {
      LoginService.registerUser(user)
        .then(function(res) {
          $log.log("register user: ", res); 
          LoginService.broadcastLogin(); 
          $mdToast.showSimple('Account created.'); 
          $state.go('home.dashboard');  
        })
        .catch(function(err){
          $log.error("Error signing up: ", err); 
          $mdToast.showSimple('Error signing up.'); 
        })
        .finally(function() {
          user.email = "";
          user.password = "";
        });
    }

    var fail = function(err) {
      console.error(err);
    }

  }

})();

(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:buildsService
   * @description
   * # buildsService
   * Service of the app
   */

  angular
    .module('builds')
    .factory('BuildsService', Builds);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  Builds.$inject = ['$http', '$log'];

  function Builds($http, $log) {
    return {
      getBuilds: getBuilds,
      createBuild: createBuild,
      getBuildDetails: getBuildDetails,
      deleteBuild: deleteBuild, 
      addCommentToBuild: addCommentToBuild, 
      addPartToBuild: addPartToBuild
    }

    function getBuilds() {
      return $http.get('/api/builds/')
        .then(function(data) {
          return data.data;
        })
        .catch(function(err) {
          if (err) $log.error("Error retrieving builds: ", err);
        })
    }

    function createBuild(build) {
      $log.log('create build object: ', build); 
      return $http.post('/api/builds/', build)
        .then(function(data, status, headers, config) {
          return data.data;
        })
        .catch(function(err) {
          $log.error("Error creating build: ", err);
        })
    }

    function getBuildDetails(id) {
      var url = "/api/builds/" + id;
      return $http.get(url)
        .then(function(data, status, headers, config) {
          return data.data;
        })
        .catch(function(err) {
          $log.error("Error retrieving build data: ", err);
        })

    }

    function deleteBuild(id) {
      var url = "/api/builds/" + id;
      return $http.delete(url)
        .then(function(data, status, headers, config) {
          return data.data;
        })
        .catch(function(err) {
          $log.error("Error deleting build: ", err);
        })
    }

    function addCommentToBuild(id, comment){
      var url = "/api/builds/comment/" + id; 
      return $http.post(url, comment)
        .then(function(data){
          return data.data; 
        })
        .catch(function(err){
          $log.error("Error adding comment: ", err); 
        })
    }

    function addPartToBuild(id, part){
      var url = "/api/builds/parts/" + id; 
      return $http.post(url, part)
        .then(function(data){
          return data.data; 
        })
        .catch(function(err){
          $log.error("Error adding part to build: ", err); 
        })
    }


  }


})();

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

(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:menuService
   * @description
   * # menuService
   * Service of the app
   */

  angular
    .module('builtright')
    .factory('MenuService', Menu);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  Menu.$inject = ['$http'];

  function Menu($http) {

    var menu = [

      {
        link: 'builds',
        name: 'Builds'
      },

      {
        link: 'login',
        name: 'Login'
      },

    ];

    return {
      listMenu: function() {
        return menu;
      }
    }

  }

})();

(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:menuService
   * @description
   * # menuService
   * Service of the app
   */

  angular
    .module('builtright')
    .factory('MenuService', Menu);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  Menu.$inject = ['$http'];

  function Menu($http) {

    var menu = [

      {
        link: 'builds',
        name: 'Builds'
      }

    ];

    return {
      listMenu: function() {
        return menu;
      }
    }

  }

})();

(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:loginService
   * @description
   * # loginService
   * Service of the app
   */

  angular
    .module('login')
    .factory('LoginService', LoginService);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  LoginService.$inject = ['$log', '$http', '$mdToast', '$state', '$rootScope'];

  function LoginService($log, $http, $mdToast, $state, $rootScope) {
    // $log.log("LoginService called.");

    var LoginService = {
      registerUser: registerUser,
      loginUser: loginUser,
      logoutUser: logoutUser,
      checkLoggedIn: checkLoggedIn,
      getUserInfo: getUserInfo,
      broadcastLogin: broadcastLogin
    }

    return LoginService;

    function registerUser(user) {
      return $http.post('/api/auth/user', user)
        .then(success)
        .catch(fail);
    }

    function loginUser(user) {
      return $http.post('/api/auth/', user)
        .then(success)
        .then(function(res) {
          $mdToast.showSimple('Logged in.');
          $state.go('home.dashboard');
        })
        .catch(fail);
    }

    function logoutUser() {
      return $http.get('/api/auth/logout')
        .then(function(res) {
          $mdToast.showSimple('Logged out.');
        })
        .catch(fail);
    }

    function checkLoggedIn() {
      $http.get('/api/auth/')
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          // $log.log("LoginService checkLoggedIn: ", err);
          return err;
        });
    }

    function getUserInfo() {
      return $http.get('/api/auth/user')
        .then(success)
        .catch(fail);
    }

    function broadcastLogin() {
      $rootScope.$broadcast('user-login');
      $log.log("$rootscope.$broadcast user-login");
    }

    function broadcastLogout() {
      $rootScope.$broadcast('user-logout');
      $log.log("$rootscope.$broadcast user-logout");
    }

    function success(res) {
      return res.data;
    }

    function fail(err) {
      return $log.error("Error in Login Service: ", err);
    }
  }

})();
