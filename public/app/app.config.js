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

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.hashPrefix('!');
    // $locationProvider.html5Mode(true); 

    // This is required for Browser Sync to work poperly
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


    $urlRouterProvider
      .otherwise('/dashboard');

  }

  runBlock.$inject = ['$rootScope'];

  function runBlock($rootScope) {
    'use strict';

    console.log('AngularJS run() function...');
  }


})();
