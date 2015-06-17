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

    $scope.mail = function(){
      console.log('Mail advice!', $scope);
    };

    $scope.submit = function(){

      $scope.mailForm = false;
      $scope.usernames = [];

      angular.forEach($scope.inputs, function(input) {
        // Reset error so it will animate again
        input.error = false;
        // We only need username from the input object for validation in our dataservice
        this.push(input.value);
      }, $scope.usernames);

      // Validate all the users if they're valid Letterboxd users
      $q.when(validateUsers($scope.usernames)).then(function(data){
        if(data.status === 200){
          $scope.mailForm = data.needs_to_sync;

          // If the data needs to be synced, we will need extra information for our mail so please show that form
          if($scope.mailForm === true){
            return false;
          }

          // Form handling here
          console.log('Show advice!', $scope);
          return true;
        }

        // We have errors, so set the right inputs to an error state in order to do something with it in our view
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