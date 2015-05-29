(function() {

  'use strict';

  angular
    .module('app.widgets', [])
    .directive('search', search);

  function search() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/widgets/search.directive.html',
      controller: searchController,
      bindToController: true
    };

    return directive;
  }

  function searchController($scope) {

  }

})();