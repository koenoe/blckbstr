(function() {

  'use strict';

  /* @ngInject */
  function movieRating() {

    var directive = {
      restrict: 'EA',
      templateUrl: 'scripts/widgets/movie-rating.directive.html',
      controller: movieRatingController,
      controllerAs: 'vm',
      bindToController: true,
      scope: { ratings: '=ratings' }
    };

    return directive;
  }

  /* @ngInject */
  function movieRatingController($scope) {

    /* jshint validthis: true */
    var vm = this;

    function activate(){
      vm.activeRating = 0;
    }

    $scope.isActive = function(index) {
      return index === vm.activeRating;
    };

    $scope.selectRating = function(index) {
      // Set active rating
      vm.activeRating = index;

      // Calculate circumfence for active rating
      var r = parseInt(angular.element('#js-donut').css('r')),
          c = Math.PI * (r * 2),
          value = vm.ratings[index].rating_calculate;

      vm.ratingCircumfence = c * (100 - value) / 100;
    };

    activate();
  }

  angular
    .module('app.widgets', [])
    .directive('movieRating', movieRating);

})();