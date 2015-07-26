(function() {
  'use strict';

  // $q, dataservice, logger
  /* @ngInject */
  function Movie($rootScope, $scope, $q, $routeParams, dataservice) {

    var vm = this;

    function activate(){
      var promises = [getAdvice($routeParams.slug)];

      return $q.all(promises).then(function() {
        // Set page title
        $rootScope.title += ' ▪ ' + vm.title;

        // Select default rating
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

      vm.ratingCircumfence = calculateCircumfence(index);
    }

    function calculateCircumfence(index) {
      var r = parseInt(angular.element('#js-donut').css('r')),
          c = Math.PI * (r * 2),
          value = vm.ratings[index].rating_calculate;

      return c * (100 - value) / 100;
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
