(function() {
  'use strict';

  // $q, dataservice, logger
  /* @ngInject */
  function MovieController($scope) {
    $scope.activeRating = 0;

    $scope.isActive = function(index) {
      return index === $scope.activeRating;
    }

    $scope.selectRating = function(rating, index) {
      $scope.activeRating = index;
    };

    $scope.mv = {
      title: 'Ex Machina',
      year: 2015,
      director: 'Alex Garland',
      ratings: [{
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
      }]
    };
  }

  angular
    .module('app.movie')
    .controller('MovieController', MovieController);

})();
