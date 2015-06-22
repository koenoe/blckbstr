(function() {
  'use strict';

  /* @ngInject */
  // $http, $location, $q, exception, logger
  function dataservice($httpParamSerializerJQLike, $http, $location, $q, exception) {

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

    function createAdvice(data){

      function createAdviceSuccess(data) {
        return data.data;
      }

      function createAdviceError(message) {
        exception.catcher('XHR Failed for creating advice')(message);
      }

      return $http.post(apiUrl + 'advices', {
          'usernames': data.usernames,
          'email': data.email
        })
        .then(createAdviceSuccess)
        .catch(createAdviceError);
    }

    function getAdvice(hash){
      function getAdviceSuccess(data) {
        return data.data;
      }

      function getAdviceError(message) {
        exception.catcher('XHR Failed for retrieving advice: ')(message);
      }

      return $http.get(apiUrl + 'advices/' + hash)
        .then(getAdviceSuccess)
        .catch(getAdviceError);
    }

    return {
      getRandomMovie: getRandomMovie,
      validateUsers: validateUsers,
      createAdvice: createAdvice,
      getAdvice: getAdvice
    };
  }

  angular
    .module('app.core')
    .factory('dataservice', dataservice);
})();