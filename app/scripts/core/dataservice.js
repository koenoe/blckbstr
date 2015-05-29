(function() {
  'use strict';

  /* @ngInject */
  // $http, $location, $q, exception, logger
  function dataservice($http, $location, $q, exception) {

    function getRandomMovie() {

      // data, status, headers, config
      function getRandomMovieComplete(data) {
        return data.data;
      }

      return $http.get('http://localhost:3000/api/v1/movies/random')
        .then(getRandomMovieComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getRandomMovie')(message);
          $location.url('/');
        });
    }

    function prime() {

      function success() {
        isPrimed = true;
        // logger.info('Primed data');
      }

      // This function can only be called once.
      if (primePromise) {
        return primePromise;
      }

      primePromise = $q.when(true).then(success);
      return primePromise;
    }

    function ready(nextPromises) {
      var readyPromise = primePromise || prime();

      return readyPromise
        .then(function() { return $q.all(nextPromises); })
        .catch(exception.catcher('"ready" function failed'));
    }

    var isPrimed = false,
        primePromise,
        service = {
          getRandomMovie: getRandomMovie,
          ready: ready
        };

    return service;
  }

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

})();