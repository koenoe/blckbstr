(function() {
  'use strict';

  angular
    .module('app.movie')
    .controller('Movie', Movie);

  Movie.$inject = ['$q', 'dataservice', 'logger'];

  function Movie($q, dataservice, logger) {

    var vm = this;

    activate();

    function activate() {
      console.log('activate movie');
    }
  }
})();
