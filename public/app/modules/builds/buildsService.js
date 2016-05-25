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
      getBuilds: getBuilds
    }

    function getBuilds() {
      // return $http({ method: 'GET', url: '/builds' })
      //   .then(function(data, status, headers, config) {
      //     $log.info("Builds headers: ", headers);
      //     $log.info("Builds status: ", status);
      //     $log.info("Builds config: ", config);
      //     $log.info("Builds: ", data);
      //     return data;
      //   })
      //   .catch(function(err) {
      //     if (err) $log.error("Error retrieving builds: ", err);
      //   })
      return {
        "builds": [
          {
            "name":"test build",
            "date": Date.now(),
            "type":"in progress"
          }
        ]
      }
    }
  }


})();
