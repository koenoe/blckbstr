(function() {
  'use strict';

  // $q, dataservice, logger
  function Home($q, dataservice) {

    var vm = this;

    vm.backdropUrl = '';
    vm.title = '';
    vm.releaseYear = '';
    vm.imdbId = '';
    vm.show = false;

    function activate() {
      // var promises = [getRandomMovie()];
      // return $q.all(promises).then(function() {
      // });

      $q.when(getRandomMovie()).then(function(){
        $q.when(preloadBackdrop()).then(function(){
          vm.show = true;
        });
      });
    }

    function getRandomMovie() {
      return dataservice.getRandomMovie().then(function(data) {
          vm.backdropUrl = data.backdropUrl;
          vm.title = data.title;
          vm.releaseYear = data.releaseYear;
          vm.imdbId = data.imdbId;
          return data;
      });
    }

    function preloadBackdrop(){
      var defer = $q.defer(),
          $img = angular.element(new Image());

      $img.bind('load', function(){
        defer.resolve($img);
      });

      $img.attr('src', vm.backdropUrl);

      return defer.promise;
    }

    activate();
  }

  angular
    .module('app.home')
    .controller('Home', Home);

  Home.$inject = ['$q', 'dataservice', 'logger'];
  
})();
