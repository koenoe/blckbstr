(function() {
  'use strict';

  // $q, dataservice, logger
  /* @ngInject */
  function Movie($scope, $q, $routeParams, dataservice) {

    var vm = this;

    function activate(){
      var promises = [getAdvice($routeParams.slug)];

      return $q.all(promises).then(function() {

      });
    }

    function getAdvice(hash) {
      return dataservice.getAdvice(hash).then(function(data) {
        if (data.status === 200) {
          var movie = data.movie;

          angular.forEach(movie, function(value, key) {
            vm[key] = value;
          });

          return data;
        }
        return false;
      });
    }

    activate();
  }

  angular
    .module('app.movie')
    .controller('Movie', Movie);

})();
