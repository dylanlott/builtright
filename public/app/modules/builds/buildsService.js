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
      getBuildDetails: getBuildDetails
    }

    function getBuilds() {
      return $http({ method: 'GET', url: '/api/builds' })
        .then(function(data, status, headers, config) {
          $log.info("Builds headers: ", headers);
          $log.info("Builds status: ", status);
          $log.info("Builds config: ", config);
          $log.info("Builds: ", data);
          return data.data;
        })
        .catch(function(err) {
          if (err) $log.error("Error retrieving builds: ", err);
        })
    }

    function createBuild(build) {
      return $http.post('/api/builds')
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

    function addComentToBuild(id, comment){
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
