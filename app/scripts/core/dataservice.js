(function() {
  'use strict';

  /* @ngInject */
  // $http, $location, $q, exception, logger
  function dataservice($http, $location, $q, exception) {

    var apiUrl = 'http://localhost:3000/v1/';

    function getRandomMovie() {

      // data, status, headers, config
      function getRandomMovieSuccess(data) {
        return data.data;
      }

      function getRandomMovieError(message) {
        exception.catcher('XHR Failed for getRandomMovie')(message);
      }

      return $http.get(apiUrl + 'movies/random')
        .then(getRandomMovieSuccess)
        .catch(getRandomMovieError);
    }

    function validateUsers(usernames){

      // data, status, headers, config
      function validateUsersSuccess(data) {
        return data.data;
      }

      function validateUsersError(data) {
        return data.data;
      }

      return $http.get(apiUrl + 'users/validate', {
          params: {
            'usernames[]': usernames
          }
        })
        .then(validateUsersSuccess)
        .catch(validateUsersError);
    }

    return {
      getRandomMovie: getRandomMovie,
      validateUsers: validateUsers
    };
  }

  angular
    .module('app.core')
    .factory('dataservice', dataservice);
})();