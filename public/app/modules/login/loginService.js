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
    .factory('LoginService', Login);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  Login.$inject = ['$http', '$log'];

  function Login($http, $log) {
    return {
      loginUser: loginUser
    }

    function loginUser(user) {
    	var user = {
    		"username": user.username, 
    		"password": user.password
    	}
      return $http.post('/users/auth', user)
        .then(function(data, status, headers, config){
        	$log.log("Logged in user: ", data); 
        	return data; 
        })
        .catch(function(err){
        	if(err) $log.error("Error logging in user: ", err);
        })
    }
  }

})();
