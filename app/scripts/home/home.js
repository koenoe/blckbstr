(function() {
  'use strict';

  /* @ngInject */
  // $q, dataservice, logger
  function Home($q, dataservice) {

    var vm = this;

    vm.title = '';
    vm.backdrop_url = '';
    vm.release_year = '';
    vm.imdb_url = '';
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
        vm.title = data.title;
        vm.backdrop_url = data.tmdb_backdrop_url;
        vm.release_year = data.release_year;
        vm.imdb_url = data.imdb_url;
        return data;
      });
    }

    function preloadBackdrop(){
      var defer = $q.defer(),
          $img = angular.element(new Image());

      $img.bind('load', function(){
        defer.resolve($img);
      });

      $img.attr('src', vm.backdrop_url);

      return defer.promise;
    }

    activate();
  }

  angular
    .module('app.home')
    .controller('Home', Home);

})();
