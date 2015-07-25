(function() {
  'use strict';

  // $q, dataservice, logger
  /* @ngInject */
  function Movie($scope, $q, $routeParams, dataservice) {

    var vm = this;

    function activate(){
      var promises = [getAdvice($routeParams.slug)];

      return $q.all(promises).then(function() {
        selectRating(0);
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

    function selectRating(index){
      // Set active rating
      vm.activeRating = index;

      // Calculate circumfence for active rating
      var r = parseInt(angular.element('#js-donut').css('r')),
          c = Math.PI * (r * 2),
          value = vm.ratings[index].rating_calculate;

      vm.ratingCircumfence = c * (100 - value) / 100;
    }

    $scope.isActive = function(index) {
      return index === vm.activeRating;
    };

    $scope.selectRating = function(index) {
      selectRating(index);
    };

    activate();
  }

  angular
    .module('app.movie')
    .controller('Movie', Movie);

})();
