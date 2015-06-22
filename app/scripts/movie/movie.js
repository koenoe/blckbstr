(function() {
  'use strict';

  // $q, dataservice, logger
  /* @ngInject */
  function Movie($scope, $q, $routeParams, dataservice) {

    var vm = this;

    // $sceProvider.enabled(false);

    $scope.activeRating = 0;

    function activate(){
      var promises = [getAdvice($routeParams.slug)];
      return $q.all(promises).then(function() {

        // TO DO: Everything done, do something

      });
    }

    function getAdvice(hash) {
      return dataservice.getAdvice(hash).then(function(data) {
        if(data.status === 200){
          var movie = data.movie;

          angular.forEach(movie, function(value, key) {
            vm[key] = value;
          });

          // FIX ME: dummy ratings
          vm.ratings = [{
            name: 'Letterboxd',
            num: 4033,
            rating: 81
          },
          {
            name: 'IMDb',
            num: 37905,
            rating: 79
          },
          {
            name: 'TMDb',
            num: 123,
            rating: 71
          }];

          return data;
        }
        return false;
      });
    }

    $scope.isActive = function(index) {
      return index === $scope.activeRating;
    };

    $scope.selectRating = function(rating, index) {
      $scope.activeRating = index;
    };

    activate();
  }

  angular
    .module('app.movie')
    .controller('Movie', Movie);

})();
