(function() {
  'use strict';

  // $q, dataservice, logger
  function Movie() {

    // var vm = this;

    function activate() {
      
    }

    activate();
  }

  angular
    .module('app.movie')
    .controller('Movie', Movie);

  Movie.$inject = ['$q', 'dataservice', 'logger'];

})();
