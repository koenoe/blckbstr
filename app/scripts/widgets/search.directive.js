(function() {

  'use strict';

  /* @ngInject */
  function search() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'scripts/widgets/search.directive.html',
      controller: searchController,
      bindToController: true
    };

    return directive;
  }

  /* @ngInject */
  function searchController($scope) {
    $scope.usernames = [];

    // create empty username field
    $scope.addUsernameField = function() {
      $scope.usernames.push('');
    };

    // remove username
    $scope.remove = function(index) {
      $scope.usernames.splice(index, 1);
    };
  }

  angular
    .module('app.widgets', [])
    .directive('search', search);

})();