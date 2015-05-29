(function() {
  'use strict';

  // $q, dataservice, logger
  function Movie() {

    // var vm = this;

    function activate() {
      console.log('activate movie');
    }

    activate();
  }

  angular
    .module('app.movie')
    .controller('Movie', Movie);

  Movie.$inject = ['$q', 'dataservice', 'logger'];

})();
