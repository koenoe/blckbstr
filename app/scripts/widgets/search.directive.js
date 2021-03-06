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
  function searchController($scope, $q, $location, dataservice) {

    function validateUsers(usernames) {
      return dataservice.validateUsers(usernames);
    }

    function createAdvice(usernames, email) {
      return dataservice.createAdvice({
        usernames: usernames,
        email: email
      });
    }

    function createAdviceComplete(data){
      if(data.hash && data.status === 200){
        if(data.email === true){
          $scope.mailForm = false;
          $scope.thanks = true;
        } else {
          $location.path('/movie/' + data.hash);
        }
      }
    }

    function startCreatingAdvice(){
      $q.when(createAdvice($scope.usernames, $scope.email)).then(createAdviceComplete);
    }

    function activate(){
      $scope.mailForm = false;
      $scope.usernames = [];
      $scope.email = '';

      $scope.inputs = [{
        type: 'plus',
        value: '',
        error: false
      }];
    }

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
      startCreatingAdvice();
    };

    $scope.submit = function(){
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

          return startCreatingAdvice();
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

    $scope.retry = function(){
      $scope.thanks = false;
      activate();
    };

    activate();
  }

  angular
    .module('app.widgets', [])
    .directive('search', search);

})();