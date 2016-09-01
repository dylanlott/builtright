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
