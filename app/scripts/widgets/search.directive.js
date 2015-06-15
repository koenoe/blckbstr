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
  function searchController($scope, $q, dataservice) {

    function validateUsers(usernames) {
      return dataservice.validateUsers(usernames);
    }

    $scope.needsToSync = false;

    $scope.inputs = [{
      type: 'plus',
      value: '',
      error: false
    }];

    $scope.addInput = function() {
      $scope.inputs.push({
        type: 'min',
        value: '',
        error: false
      });
    };

    $scope.removeInput = function(index) {
      $scope.inputs.splice(index, 1);
    };

    $scope.submit = function(){

      var usernames = [];
      angular.forEach($scope.inputs, function(input) {
        // Reset error so it will animate again
        input.error = false;
        // We only need username from the input object for validation in our dataservice
        this.push(input.value);
      }, usernames);

      $q.when(validateUsers(usernames)).then(function(data){
        if(data.status === 200){
          // Success shizzle here
          return console.log('Form submit handling here');
        }

        if(data.errors.length > 0){
          angular.forEach(data.errors, function(error) {
            angular.forEach($scope.inputs, function(input) {
              if(input.value === error){
                input.error = true;
              }
            });
          });
        }
      });
    };
  }

  angular
    .module('app.widgets', [])
    .directive('search', search);

})();