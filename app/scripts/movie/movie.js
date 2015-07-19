(function() {
  'use strict';

  // $q, dataservice, logger
  /* @ngInject */
  function Movie($scope, $q, $routeParams, dataservice) {

    var vm = this;

    // $sceProvider.enabled(false);

    function activate(){
      var promises = [getAdvice($routeParams.slug)];
      
      return $q.all(promises).then(function() {

        $scope.selectRating(0);
      });
    }

    function getAdvice(hash) {
      return dataservice.getAdvice(hash).then(function(data) {
        if (data.status === 200) {
          var movie = data.movie;

          angular.forEach(movie, function(value, key) {
            vm[key] = value;
          });

          // FIX ME: dummy ratings
          vm.ratings = [{
            name: 'Letterboxd',
            num: 4033,
            rating: 62
          },
          {
            name: 'IMDb',
            num: 37905,
            rating: 50
          },
          {
            name: 'TMDb',
            num: 123,
            rating: 88
          }];

          return data;
        }
        return false;
      });
    }

    $scope.isActive = function(index) {
      return index === vm.activeRating;
    };

    $scope.selectRating = function(index) {
      // Set active rating
      vm.activeRating = index;

      // Calculate circumfence for active rating
      var r = parseInt($('#js-donut').css('r')),
          c = Math.PI * (r * 2),
          value = vm.ratings[index].rating;

      vm.ratingCircumfence = c * (100 - value) / 100;
    };

    activate();
  }

  angular
    .module('app.movie')
    .controller('Movie', Movie);

})();
