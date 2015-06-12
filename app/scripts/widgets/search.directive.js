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

    $scope.inputs = [{
      type: 'plus'
    }];

    $scope.addInput = function() {
      $scope.inputs.push({
        type: 'min'
      });
    };

    $scope.removeInput = function(index) {
      $scope.inputs.splice(index, 1);
    };

    $scope.userExist = function(username){
      console.log(username);
    };

    $scope.submit = function(){
      console.log('submit form');
    };
  }

  angular
    .module('app.widgets', [])
    .directive('search', search);

})();